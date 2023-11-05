<template>
  <div class="bg-base-200 flex flex-col p-8 md:flex-row">
    <!-- Main Content -->
    <header class="mb-12 text-center">
      <img :src="image" alt="Background Image" class="mx-auto mb-4 w-1/4" />
      <h1 class="text-4xl font-bold">{{ title }}</h1>
      <h2 class="text-2xl font-semibold">{{ subtitle }}</h2>
      <a :href="amazonLink" class="btn btn-primary mx-auto mb-8 block w-max">Amazon link</a>
    </header>
    <!-- Quotes on the Right Side Panel -->
    <aside class="mt-8 w-full md:mt-0 md:w-1/3">
      <blockquote class="mb-6 border-l-4 border-gray-800 p-4 text-center italic">
        "Mermaids of Venice is a literary ballerina - supple, strong, astonishing, and captivating in a way that makes
        your heart race. From the first line to the last, I was thoroughly engrossed. It's akin to a roller-coaster -
        once you're on, you're committed to the ride." - Amazon Review
      </blockquote>

      <blockquote class="mb-6 border-l-4 border-gray-800 p-4 italic">
        "Smart, sexy, and delightfully subversive, I devoured 'Mermaids of Venice' the first time I read it. It made me
        laugh, cry, and gave me goosebumps. A linguistically unique treat I highly recommend!" -C Curtis
      </blockquote>

      <blockquote class="mb-6 border-l-4 border-gray-800 p-4 italic">
        "It's a rarity for a novel to make me laugh out loud, but this one managed that feat frequently – for its humor,
        surprises, wit, heart, and magical richness. Silas Knight is truly a master of prose." -C. Kinnamon
      </blockquote>
    </aside>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const title = ref('Mermaids of Venice');
const subtitle = ref('A subversive fairy tale of gods and street performers.');
const image = ref('/images/utility/mermaids/mermaids1.jpg');
const amazonLink = ref('https://www.amazon.com/Mermaids-Venice-Silas-Knight/dp/0615516742');
const downloadLink = ref('/mermaids.pdf');
const mosquitoNetsLink = ref('/projects/amibot');
const europePic1 = ref('/images/utility/mermaids/europe1.png');
const europePic2 = ref('/images/utility/mermaids/europe2.jpg');
const europePic3 = ref('/images/utility/mermaids/europe3.jpg');

const showEuropeImage1 = ref(false);
const showEuropeImage3 = ref(false);

function toggleEurope1Image() {
  showEuropeImage1.value = !showEuropeImage1.value;
}

function toggleEurope3Image() {
  showEuropeImage3.value = !showEuropeImage3.value;
}
</script>
