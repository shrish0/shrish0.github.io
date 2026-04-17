<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import fallbackQuestions from '@/data/questions.json'

interface ChatMessage {
  id: number
  role: 'assistant' | 'user'
  content: string
}

const props = defineProps<{
  isOpen: boolean
  name: string
  headline: string
  summary: string
  email: string
  githubUrl?: string
  linkedinUrl?: string
  skills: string[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const messageId = ref(3)
const draft = ref('')
const isAiMode = ref(false)
const hasPingedServer = ref(false)
const showQuestionPicker = ref(false)
const chatViewport = ref<HTMLElement | null>(null)
const messageInput = ref<HTMLTextAreaElement | null>(null)

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'assistant',
    content: `Hi, I'm ${props.name}'s AI portfolio guide. Ask about backend systems, projects, skills, or how to get in touch.`,
  },
  {
    id: 2,
    role: 'assistant',
    content: 'Pick a suggested question below or type your own message.',
  },
])

const quickPrompts = computed(() => [
  `What kind of engineer is ${props.name}?`,
  'Show me the strongest backend skills.',
  'How can I contact you?',
])

const normalizedSkillSummary = computed(() => props.skills.join(', '))

const availableQuestions = computed(() =>
  [
    ...quickPrompts.value,
    ...fallbackQuestions.map(question => {
      if (question.keywords.includes('contact')) return 'How can I contact you?'
      if (question.keywords.includes('skill')) return 'What skills and tech stack do you specialize in?'
      if (question.keywords.includes('project')) return 'Tell me about your projects and experience.'
      if (question.keywords.includes('github')) return 'Where can I see your GitHub or code?'
      if (question.keywords.includes('hi')) return 'Who are you and what can you help with?'
      return `Ask about: ${question.keywords.join(', ')}`
    }),
  ].filter((question, index, items) => items.indexOf(question) === index),
)

const suggestionTitle = computed(() => (isAiMode.value ? 'AI Question Picker' : 'Portfolio Question Picker'))
const shouldShowQuestionPicker = computed(() => !isAiMode.value && showQuestionPicker.value)

const sanitizeMessage = (content: string) =>
  content
    .replace(/<li>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

const scrollToLatest = async () => {
  await nextTick()
  if (chatViewport.value) {
    chatViewport.value.scrollTop = chatViewport.value.scrollHeight
  }
}

const focusInput = async () => {
  await nextTick()
  messageInput.value?.focus()
}

const pushAssistantMessage = async (content: string) => {
  messages.value.push({
    id: messageId.value++,
    role: 'assistant',
    content: sanitizeMessage(content),
  })
  await scrollToLatest()
}

const selectQuestion = async (question: string) => {
  draft.value = question
  showQuestionPicker.value = false
  await focusInput()
}

const toggleAiMode = async () => {
  isAiMode.value = !isAiMode.value
  showQuestionPicker.value = false

  if (isAiMode.value && !hasPingedServer.value) {
    hasPingedServer.value = true
    fetch('https://sentinelai-p4xw.onrender.com/').catch(() => {})
  }
  await pushAssistantMessage(
    isAiMode.value
      ? 'Backend AI Mode enabled. Pick a suggested question below or type your own prompt.'
      : 'Backend AI Mode disabled. Pick a portfolio question below or type your own message.',
  )
  await focusInput()
}

const toggleQuestionPicker = () => {
  if (isAiMode.value) return
  showQuestionPicker.value = !showQuestionPicker.value
}

const sendMessage = async () => {
  const content = draft.value.trim()
  if (!content) return

  messages.value.push({
    id: messageId.value++,
    role: 'user',
    content,
  })

  draft.value = ''
  showQuestionPicker.value = false
  await scrollToLatest()

  const lowerInput = content.toLowerCase()
  const useAiBackend = isAiMode.value || lowerInput.startsWith('@ai_bot')
  const cleanContent = lowerInput.startsWith('@ai_bot') ? content.replace(/^@ai_bot\s*/i, '') : content

  if (!useAiBackend) {
    const match = fallbackQuestions.find(question => question.keywords.some(keyword => lowerInput.includes(keyword)))

    if (match) {
      const answer = match.answer
        .replace('{email}', props.email)
        .replace('{linkedinUrl}', props.linkedinUrl || '')
        .replace('{headline}', props.headline)
        .replace('{skills}', normalizedSkillSummary.value)
        .replace('{githubUrl}', props.githubUrl || '')

      await pushAssistantMessage(answer)
      return
    }

    await pushAssistantMessage(
      "I couldn't find a direct answer. Try one of the suggested questions below, or enable AI Mode for the backend assistant.",
    )
    return
  }

  const loadingId = messageId.value++
  messages.value.push({
    id: loadingId,
    role: 'assistant',
    content: 'Thinking...',
  })
  await scrollToLatest()

  try {
    const res = await fetch('https://sentinelai-p4xw.onrender.com/resume/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: cleanContent }),
    })

    if (!res.ok) throw new Error('API Error')

    const data = await res.json()
    const finalResponse = sanitizeMessage(data.message || data.response || data.answer || data.content || String(data))
    const loadingMessage = messages.value.find(message => message.id === loadingId)
    if (loadingMessage) loadingMessage.content = finalResponse
  } catch {
    const loadingMessage = messages.value.find(message => message.id === loadingId)
    if (loadingMessage) {
      loadingMessage.content = sanitizeMessage(
        "The AI backend is currently resting or unavailable. Please wait 30-50 seconds for the server to wake up and try again, or switch off AI Mode to ask standard portfolio questions."
      )
    }
  }

  await scrollToLatest()
}

watch(
  () => props.isOpen,
  async isOpen => {
    if (isOpen) {
      if (!isAiMode.value) showQuestionPicker.value = false
      await scrollToLatest()
      await focusInput()
    }
  },
)
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-95"
  >
    <section
      v-if="isOpen"
      id="ai-chat-panel"
      class="fixed bottom-8 right-4 left-4 md:left-auto md:right-8 z-[60] w-auto md:w-[28rem]"
      aria-label="AI chatbot panel"
    >
      <div class="glass-panel flex max-h-[min(82vh,46rem)] flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-surface-container dark:bg-[linear-gradient(180deg,rgba(22,35,71,0.96),rgba(11,19,38,0.98))] shadow-[0_20px_60px_rgba(6,12,30,0.45)]">
        <div class="relative shrink-0 border-b border-outline-variant/20 bg-surface-container-highest dark:bg-[radial-gradient(circle_at_top_right,rgba(142,213,255,0.18),transparent_42%),linear-gradient(180deg,rgba(37,58,110,0.9),rgba(18,31,63,0.95))] px-5 py-5">
          <div class="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent_45%)]"></div>
          <div class="relative flex items-start justify-between gap-4">
            <div class="min-w-0">
              <div class="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <p class="shrink-0 font-label text-[11px] uppercase tracking-[0.28em] text-primary">AI Console</p>
                <button
                  type="button"
                  class="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] transition-all cursor-pointer"
                  :class="
                    isAiMode
                      ? 'border-primary bg-primary text-surface shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_28%,transparent)]'
                      : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:border-primary hover:text-primary'
                  "
                  title="Toggle real backend AI mode"
                  @click="toggleAiMode"
                >
                  <span class="h-2 w-2 shrink-0 rounded-full" :class="isAiMode ? 'bg-surface' : 'bg-on-surface-variant/70'"></span>
                  <span>{{ isAiMode ? 'AI Mode On' : 'AI Mode Off' }}</span>
                </button>
              </div>
              <h3 class="font-headline text-[20px] font-bold leading-tight text-heading">Chat With {{ name }}</h3>
            </div>
            <button
              type="button"
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant transition-colors cursor-pointer hover:bg-surface-container hover:text-primary"
              aria-label="Close chat"
              @click="emit('close')"
            >
              <span class="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        <div ref="chatViewport" class="min-h-0 flex-1 overflow-y-auto space-y-3 bg-surface/50 dark:bg-[linear-gradient(180deg,rgba(11,19,38,0.3),rgba(11,19,38,0.08))] px-4 py-4">
          <article
            v-for="message in messages"
            :key="message.id"
            class="flex"
            :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
              :class="
                message.role === 'user'
                  ? 'aurora-glow rounded-br-md text-surface shadow-[0_10px_30px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]'
                  : 'glass-surface rounded-bl-md border border-outline-variant/20 text-on-surface'
              "
            >
              {{ message.content }}
            </div>
          </article>
        </div>

        <form class="shrink-0 border-t border-outline-variant/20 bg-surface-container dark:bg-[linear-gradient(180deg,rgba(17,29,58,0.96),rgba(11,19,38,0.98))] p-4" @submit.prevent="sendMessage()">
          <div v-if="!isAiMode" class="mb-3">
            <button
              type="button"
              class="mb-2 flex w-full items-center justify-between rounded-2xl border border-outline-variant/20 bg-surface-container-low dark:bg-surface/35 px-4 py-3 text-left transition-colors cursor-pointer hover:border-primary/30 hover:bg-surface-container dark:hover:bg-surface/45"
              @click="toggleQuestionPicker"
            >
              <span class="font-label text-[11px] uppercase tracking-[0.22em] text-primary">{{ suggestionTitle }}</span>
              <span class="flex items-center gap-2 text-xs text-on-surface-variant">
                <span>{{ shouldShowQuestionPicker ? 'Hide questions' : 'Show questions' }}</span>
                <span class="material-symbols-outlined text-base transition-transform" :class="shouldShowQuestionPicker ? 'rotate-180' : ''">
                  keyboard_arrow_up
                </span>
              </span>
            </button>

            <div v-if="shouldShowQuestionPicker" class="rounded-2xl border border-outline-variant/20 bg-surface-container-low dark:bg-surface/35 p-3">
              <div class="mb-2 flex items-center justify-between gap-3">
                <p class="font-label text-[11px] uppercase tracking-[0.22em] text-primary">{{ suggestionTitle }}</p>
                <span class="text-[11px] text-on-surface-variant">Click to fill input</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="question in availableQuestions"
                  :key="question"
                  type="button"
                  class="cursor-pointer rounded-full bg-surface dark:bg-surface/50 px-3 py-2 text-xs font-medium text-on-surface transition-colors hover:bg-primary/15 hover:text-primary"
                  @click="selectQuestion(question)"
                >
                  {{ question }}
                </button>
              </div>
            </div>
          </div>

          <label class="sr-only" for="chat-message">Message</label>
          <div class="flex items-end gap-3">
            <textarea
              id="chat-message"
              ref="messageInput"
              v-model="draft"
              rows="2"
              placeholder="Ask about projects, backend experience, or contact details..."
              class="min-h-[56px] flex-1 resize-none rounded-2xl border border-outline-variant/30 bg-surface dark:bg-surface/55 px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/80 focus:border-primary/40 focus:outline-none"
            ></textarea>
            <button
              type="submit"
              class="h-14 min-w-14 cursor-pointer rounded-2xl aurora-glow px-4 font-semibold text-surface shadow-[0_10px_30px_color-mix(in_srgb,var(--color-primary)_24%,transparent)] transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="!draft.trim()"
            >
              <span class="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  </Transition>
</template>
