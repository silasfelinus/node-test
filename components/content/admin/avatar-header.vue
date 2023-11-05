<template>
  <div
    class="mx-auto flex w-full flex-col items-center space-y-4 py-4 md:max-w-7xl md:flex-row md:space-x-4 md:space-y-0"
    style="max-height: 15vh"
  >
    <!-- Avatar and Welcome Message Section -->
    <div class="flex items-center space-x-4">
      <user-avatar class="h-16 w-16 rounded-full" />
      <welcome-message class="text-lg font-semibold" />
    </div>

    <!-- Login Form Section -->
    <login-form class="md:w-1/3" />

    <!-- User Interaction Icons and Role Display Section -->
    <div class="flex items-center space-x-4">
      <karma-tracker class="text-lg" />
      <mana-counter class="text-lg" />
      <role-display class="text-lg font-semibold" />
    </div>
  </div>
</template>
