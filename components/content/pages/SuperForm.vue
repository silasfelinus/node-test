<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="mx-auto max-w-md space-y-5 rounded-xl bg-white p-10 shadow-lg">
      <h1 class="mb-10 text-center text-4xl font-bold text-indigo-600">Hair by Superkate!</h1>
      <div class="mb-5 flex justify-center">
        <site-logo />
      </div>
      <form class="space-y-5">
        <label class="block text-gray-700">
          Date
          <input v-model="date" type="date" class="input input-bordered w-full" aria-label="Date" required />
        </label>
        <label class="block text-gray-700">
          Client's Name
          <input
            v-model="clientName"
            type="text"
            class="input input-bordered w-full"
            placeholder="Client's Name"
            aria-label="Client's Name"
            required
          />
        </label>
        <label class="block text-gray-700">
          Services Provided
          <input v-model="servicesProvided" type="text" class="input input-bordered w-full" placeholder="Services" />
        </label>
        <div class="card bordered">
          <div class="card-body space-y-5">
            <div class="space-y-2">
              <label class="block text-gray-700">
                Number of Hours
                <input
                  v-model="hours"
                  type="number"
                  class="input input-bordered w-full"
                  placeholder="Number of hours"
                />
              </label>
              <label class="block text-gray-700">
                Rate per Hour ($)
                <input v-model="rate" type="number" class="input input-bordered w-full" placeholder="Rate per hour" />
              </label>
            </div>
            <hr />
            <div class="space-y-2">
              <label class="block text-gray-700">
                Product Cost ($)
                <input
                  v-model="productCost"
                  type="number"
                  class="input input-bordered w-full"
                  placeholder="Product cost"
                />
              </label>
            </div>
            <hr />
            <div class="rounded-md bg-gray-100 p-2">Total cost: ${{ totalCost }}</div>
            <hr />
            <div class="rounded-md bg-gray-100 p-2">
              Calculation: (${{ rate }} Rate per hour x {{ hours }} hours) + ${{ productCost }} Product Cost = ${{
                totalCost
              }}
            </div>
          </div>
        </div>
        <label class="block text-gray-700">
          Client's Email
          <div class="relative">
            <input
              v-model="clientEmail"
              type="email"
              class="input input-bordered w-full pr-20"
              placeholder="Client's Email"
            />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              + superkate@gmail.com
            </div>
          </div>
        </label>
        <button type="submit" class="btn btn-primary w-full">Send</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const date = ref(new Date().toISOString().substr(0, 10));
const clientName = ref('');
const servicesProvided = ref('');
const hours = ref('');
const rate = ref('');
const productCost = ref('');
const clientEmail = ref('');

const totalCost = computed(() => {
  return hours.value * rate.value + Number(productCost.value);
});

const submitForm = async (event) => {
  event.preventDefault();

  // Call the function to send the email
  await sendBrevoEmail({
    date: date.value,
    clientName: clientName.value,
    servicesProvided: servicesProvided.value,
    hours: hours.value,
    rate: rate.value,
    productCost: productCost.value,
    totalCost: totalCost.value,
    clientEmail: clientEmail.value,
  });

  // Clear the form
  date.value = new Date().toISOString().substr(0, 10);
  clientName.value = '';
  servicesProvided.value = '';
  hours.value = '';
  rate.value = '';
  productCost.value = '';
  clientEmail.value = '';
};

const sendBrevoEmail = async (data) => {
  const emailData = {
    sender: { name: 'Your Name', email: 'your-email@example.com' },
    to: [{ email: 'silasfelinus@gmail.com' }, { email: 'superkate@gmail.com' }, { email: data.clientEmail }],
    subject: 'Hair by Superkate!',
    htmlContent: `
      <p>Date: ${data.date}</p>
      <p>Client's Name: ${data.clientName}</p>
      <p>Services Provided: ${data.servicesProvided}</p>
      <p>Hours: ${data.hours}</p>
      <p>Rate: ${data.rate}</p>
      <p>Product Cost: ${data.productCost}</p>
      <p>Total Cost: ${data.totalCost}</p>
    `,
  };

  try {
    await $fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    console.log('Email sent');
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};
</script>
