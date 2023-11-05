<template>
  <div class="from-primary to-secondary flex h-screen flex-col rounded-br-3xl rounded-tr-3xl bg-gradient-to-r">
    <!-- Header -->
    <div class="bg-primary flex items-center justify-between rounded-tl-3xl px-6 py-4"></div>

    <!-- Body -->
    <div class="grid flex-grow grid-cols-4 gap-4 p-6">
      <!-- Main content -->
      <div class="bg-secondary col-span-3 rounded-lg p-4">
        <slot />
      </div>

      <!-- Right Panel -->
      <div class="bg-primary flex flex-col gap-4 rounded-lg p-4">
        <button-card label="Button 1" description="Button 1 description" :color-id="1" />
        <button-card label="Button 2" description="Button 2 description" :color-id="2" />
        <button-card label="Button 3" description="Button 3 description" :color-id="3" />
        <button-card label="Button 4" description="Button 4 description" :color-id="4" />
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-primary flex justify-end rounded-br-3xl px-6 py-4">
      <AmiLink />
    </div>
  </div>
</template>
