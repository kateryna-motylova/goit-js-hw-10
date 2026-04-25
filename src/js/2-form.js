// const STORAGE_KEY = "feedback-form-state";

// // 1. Об'єкт для даних
// let formData = {
//   email: "",
//   message: "",
// };

// const form = document.querySelector(".feedback-form");

// // 2. Завантаження даних із localStorage
// const savedData = localStorage.getItem(STORAGE_KEY);

// if (savedData) {
//   try {
//     const parsedData = JSON.parse(savedData);

//     formData = parsedData;

//     form.elements.email.value = parsedData.email || "";
//     form.elements.message.value = parsedData.message || "";
//   } catch (error) {
//     console.log("Помилка читання localStorage:", error);
//   }
// }

// // 3. Обробник input (делегування)
// form.addEventListener("input", event => {
//   const { name, value } = event.target;

//   if (name === "email" || name === "message") {
//     formData[name] = value.trim();

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
//   }
// });

// // 4. Обробник submit
// form.addEventListener("submit", event => {
//   event.preventDefault();

//   if (!formData.email || !formData.message) {
//     alert("Fill please all fields");
//     return;
//   }

//   console.log(formData);

//   // Очищення
//   localStorage.removeItem(STORAGE_KEY);
//   formData = { email: "", message: "" };
//   form.reset();
// });

// const STORAGE_KEY = "feedback-form-state";

// const form = document.querySelector(".feedback-form");
// if (!form) return;

// let formData = {
//   email: "",
//   message: "",
// };

// // load
// const savedData = localStorage.getItem(STORAGE_KEY);

// if (savedData) {
//   try {
//     const parsedData = JSON.parse(savedData);

//     formData.email = parsedData.email || "";
//     formData.message = parsedData.message || "";

//     form.elements.email.value = formData.email;
//     form.elements.message.value = formData.message;
//   } catch (error) {
//     console.log("localStorage error:", error);
//   }
// }

// // input
// form.addEventListener("input", event => {
//   const { name, value } = event.target;

//   if (Object.hasOwn(formData, name)) {
//     formData[name] = value;

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
//   }
// });

// // submit
// form.addEventListener("submit", event => {
//   event.preventDefault();

//   const email = form.elements.email.value.trim();
//   const message = form.elements.message.value.trim();

//   if (!email || !message) {
//     alert("Fill please all fields");
//     return;
//   }

//   console.log({ email, message });

//   localStorage.removeItem(STORAGE_KEY);
//   form.reset();
//   formData = { email: "", message: "" };
// });

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");

let formData = {
  email: "",
  message: "",
};

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    if (parsedData && typeof parsedData === "object") {
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    }
  } catch (error) {
    console.log("localStorage error:", error);
  }
}

form.addEventListener("input", event => {
  const { name, value } = event.target;

  if (Object.hasOwn(formData, name)) {
    formData[name] = value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    alert("Fill please all fields");
    return;
  }

  console.log({ email, message });

  formData = { email: "", message: "" };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});