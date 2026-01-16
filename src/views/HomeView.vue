<script setup lang="ts">
// No script logic needed for now
</script>

<template>
  <main>
    <section class="hero">
      <div class="content">
        <h1>Hi, I'm <span class="highlight">Shrish</span></h1>
        <h2><span class="role">Software Developer</span></h2>
        <p class="tagline">Building modern, aesthetic, and performant web applications.</p>
        
        <div class="cta-group">
          <a href="/Resume.pdf" target="_blank" class="btn primary">View Resume</a>
          <a href="mailto:contact@example.com" class="btn secondary">Contact Me</a>
        </div>
      </div>
    </section>

    <section class="about">
      <h3>About Me</h3>
      <p>
        I am a passionate developer focused on creating intuitive and dynamic user experiences. 
        I specialize in Vue.js and modern web technologies. Check out my resume to see my full professional history.
      </p>
    </section>

    <footer>
      <p>&copy; 2026 Shrish. All rights reserved.</p>
      <div class="social-links">
        <!-- Add social icons/links here -->
      </div>
    </footer>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding-bottom: 50px;
}

/* Hero Section */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
}

.highlight {
  background: linear-gradient(120deg, var(--color-primary), #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2 {
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-text-mute);
  margin-bottom: 1.5rem;
}

.tagline {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  color: var(--color-text);
  opacity: 0.8;
}

/* Buttons */
.cta-group {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn.primary {
  background: var(--color-primary);
  color: #fff;
  box-shadow: 0 4px 14px 0 rgba(14, 165, 233, 0.39);
}

.btn.primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(14, 165, 233, 0.23);
}

.btn.secondary {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-heading);
}

.btn.secondary:hover {
  border-color: var(--color-heading);
  background: rgba(255, 255, 255, 0.05);
}

/* About Section */
.about {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 3rem;
  background: rgba(30, 41, 59, 0.5); /* Glass-ish background */
  border-radius: 16px;
  border: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
}

.about h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-heading);
}

.about p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text);
}

/* Footer */
footer {
  text-align: center;
  margin-top: auto;
  color: var(--color-text-mute);
  font-size: 0.9rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}
</style>
