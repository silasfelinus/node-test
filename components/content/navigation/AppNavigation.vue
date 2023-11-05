<template>
  <div class="mx-auto max-w-lg overflow-y-auto p-4">
    <ul class="space-y-4">
      <li v-for="(item, index) in filteredNavigationTree" :key="index">
        <div
          class="grid transform grid-cols-4 gap-4 overflow-hidden rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg transition-all duration-200 hover:scale-105"
        >
          <div v-if="level === 0" class="col-span-1">
            <img
              :src="item.image || item.gallery || '/images/backtree.webp'"
              alt="Section Image"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="text-default col-span-3 rounded p-4">
            <NuxtLink
              :to="item._path"
              class="text-default mb-4 block overflow-hidden overflow-ellipsis text-center text-2xl font-bold leading-tight"
            >
              {{ item.title }}
            </NuxtLink>
            <div v-if="item.children" class="mt-2 grid grid-flow-row gap-2">
              <div v-for="child in item.children" :key="child._id" class="flex flex-wrap">
                <NuxtLink
                  :to="child._path"
                  class="bg-primary text-default m-1 w-full rounded-full px-4 py-2 text-center text-sm transition-colors hover:bg-blue-600"
                >
                  {{ child.title }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  navigationTree: {
    type: Array,
    default: () => [],
  },
  level: {
    type: Number,
    default: 0,
  },
});

const filterChildRoutes = (item) => {
  if (item.children) {
    item.children = item.children.filter((child) => child._path !== item._path);
  }
  return item;
};

const filteredNavigationTree = computed(() => props.navigationTree.map(filterChildRoutes));
</script>
