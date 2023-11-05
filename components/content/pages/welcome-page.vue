<template>
  <div class="from-primary to-secondary flex min-h-screen flex-col bg-gradient-to-r">
    <div class="flex-grow overflow-auto p-6 md:p-12">
      <site-header>
        <div class="hero">
          <img src="/images/kindart.webp" alt="Kind Robots" />
          <h1>Welcome to Kind Robots</h1>
          <p>Your AI friend powered by ChatGPT.</p>
        </div>
        <slot name="headline"> </slot><site-title class="text-lg font-bold sm:text-xl"
      /></site-header>
    </div>
    <site-footer>
      <slot name="footer"></slot>
    </site-footer>
  </div>
</template>
