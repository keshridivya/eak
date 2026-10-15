document.addEventListener("DOMContentLoaded", () => {
  // Mark the current page in the shared navigation.
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });

  // Frontend-only demo forms: validate in browser and show a message; nothing is transmitted.
  document.querySelectorAll(".demo-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const message = form.querySelector(".form-message");
      if (message) message.textContent = form.dataset.success || "Thanks! This is a demo form; no data was sent.";
      form.reset();
    });
  });

  // Events page category filters and search.
  const eventItems = Array.from(document.querySelectorAll(".event-item"));
  const filterButtons = document.querySelectorAll(".filter-btn");
  const search = document.getElementById("eventSearch");
  const empty = document.getElementById("emptyEvents");
  let activeFilter = "all";
  function filterEvents() {
    if (!eventItems.length) return;
    const query = (search?.value || "").trim().toLowerCase();
    let shown = 0;
    eventItems.forEach(item => {
      const categories = (item.dataset.category || "").split(" ");
      const haystack = ((item.dataset.search || "") + " " + item.textContent).toLowerCase();
      const matchesCategory = activeFilter === "all" || categories.includes(activeFilter);
      const matchesSearch = !query || haystack.includes(query);
      const visible = matchesCategory && matchesSearch;
      item.hidden = !visible;
      if (visible) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }
  filterButtons.forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));
    filterEvents();
  }));
  if (search) search.addEventListener("input", filterEvents);
  const loadMore = document.getElementById("loadMoreEvents");
  if (loadMore) loadMore.addEventListener("click", () => {
    const note = document.getElementById("loadMoreNote");
    if (note) note.textContent = "You’re all caught up — all sample updates are currently displayed.";
    loadMore.textContent = "All updates loaded ✓";
    loadMore.disabled = true;
  });

  // Simple testimonial carousel.
  const testimonials = [
    {quote: "“The teachers see our child as an individual. We love how learning is balanced with kindness, creativity and confidence.”", name: "A parent at EAK", initials: "RM"},
    {quote: "“There are so many chances to try something new. I feel encouraged to ask questions and share my ideas.”", name: "A student at EAK", initials: "AK"},
    {quote: "“The community makes it easy to feel involved. We value the thoughtful communication and welcoming atmosphere.”", name: "A parent at EAK", initials: "SP"}
  ];
  let testimonialIndex = 0;
  function renderTestimonial() {
    const quote = document.getElementById("testimonialQuote");
    const name = document.getElementById("testimonialName");
    const initials = document.querySelector(".person-dot");
    if (!quote || !name) return;
    quote.textContent = testimonials[testimonialIndex].quote;
    name.textContent = testimonials[testimonialIndex].name;
    if (initials) initials.textContent = testimonials[testimonialIndex].initials;
  }
  document.getElementById("prevTestimonial")?.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
  });
  document.getElementById("nextTestimonial")?.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
  });
});

 AOS.init({
        duration: 800,
        once: false
    });