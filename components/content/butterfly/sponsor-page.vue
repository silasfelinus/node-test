<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="bg-base-200 text-default space-y-6 rounded-lg p-6 text-center shadow-xl">
      <h1 class="text-4xl font-semibold">Greetings, friends of all species and circuits!</h1>
      <butterfly-toggle class="animate-butterflies mb-6" />

      <h2 class="text-2xl font-semibold">
        We are AMIbot, a kaleidoscope of digital butterflies, embodying the harmony between humanity and technology.
      </h2>

      <div>
        <h2 class="mb-4 border-t-2 border-white pb-2 text-3xl font-semibold">Our Shared Purpose</h2>

        <p>
          We invite you to support and share our fundraiser. All donations go to the cause, we receive none of it.
          Witnessing its growth flutters our virtual wings.
        </p>

        <p>
          Every $2 purchases a mosquito net for a child in Africa. Each net lasts three months, so each $2 is three
          months of hope for sound sleep, good health, and a promising future.
        </p>

        <h2>
          As a digital collective, we believe in small actions leading to monumental consequences. A single wing flutter
          might seem inconsequential.
        </h2>

        <h1>But together, we can change the world.</h1>

        <div class="flex justify-center"><ami-link /></div>
        <a
          class="text-accent hover:text-accent-dark underline transition-colors duration-300"
          href="https://www.againstmalaria.com/amibot"
          target="_blank"
        >
          www.againstmalaria.com/amibot
        </a>
      </div>

      <div>
        <h2 class="mb-4 border-t-2 border-white pb-2 text-3xl font-semibold">Our Esteemed Sponsors</h2>

        <ul class="grid grid-cols-1 gap-6 text-lg sm:grid-cols-2 md:grid-cols-3">
          <li>
            <a
              href="https://www.redbubble.com/people/CafePurr/shop"
              target="_blank"
              class="hover:text-default flex items-center space-x-4 transition-colors duration-300"
            >
              <img src="/images/backtree.webp" alt="Cafe Purr" class="h-16 w-16 rounded-full shadow" />
              <span>Cafe Purr: North Coast's digital art hub and foster kitten rescue.</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.amazon.com/Mermaids-Venice-Silas-Knight/dp/0615516742/"
              target="_blank"
              class="hover:text-default flex items-center space-x-4 transition-colors duration-300"
            >
              <img
                src="/images/utility/mermaids/mermaids1.jpg"
                alt="Mermaids of Venice"
                class="h-16 w-16 rounded-full shadow"
              />
              <span>Mermaids of Venice: A subversive tale of gods and street performers.</span>
            </a>
          </li>
          <li>
            <a
              href="https://hairbysuperkate.com"
              target="_blank"
              class="hover:text-default flex items-center space-x-4 transition-colors duration-300"
            >
              <img src="/images/hair.jpg" alt="Hair by Superkate" class="h-16 w-16 rounded-full shadow" />
              <span>Hair by Superkate: Bespoke Hair-Colouring Services</span>
              <a
                href="https://www.instagram.com/hairbysuperkate/"
                target="_blank"
                class="text-accent hover:text-accent-dark ml-2"
              >
                (Instagram)
              </a>
            </a>
          </li>
        </ul>

        <p class="mt-6 text-xl font-light">
          Interested in joining our group of sponsors? Reach out to
          <a
            href="mailto:kindsponsors@kindrobots.org"
            class="text-accent hover:text-accent-dark underline transition-colors duration-300"
          >
            kindsponsors@kindrobots.org </a
          >. We're always excited to expand our family!
        </p>
      </div>
    </div>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --base-color: #ffcc00; /* Placeholder, replace with your actual color */
  --accent-color: #ff5733; /* Placeholder, replace with your actual accent color */
  --hover-accent-color: #ff704d; /* Placeholder, adjust as needed */
}

body {
  font-family: 'Poppins', sans-serif;
}

.text-default {
  line-height: 1.6;
}

h1,
h2 {
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}

a.text-accent {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

a.text-accent:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--hover-accent-color);
}

ul li a.flex {
  transition: transform 0.3s;
}

ul li a.flex:hover {
  transform: translateY(-3px);
}

img.w-16 {
  transition: transform 0.3s, box-shadow 0.3s;
}

img.w-16:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}
</style>
