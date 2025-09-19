class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }
  introduce() {
    return `Hi, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }
  teach() {
    return `I am ${this.name} and I teach ${this.subject}.`;
  }
}

const output = document.getElementById('output');

function createElement(tag, text, cls) {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (cls) el.className = cls;
  return el;
}

function renderData(data) {
  const studentsArr = data.students.map(
    s => new Student(s.id, s.name, s.age, s.course)
  );
  const instructorsArr = data.instructors.map(
    i => new Instructor(i.id, i.name, i.subject)
  );
  const coursesArr = data.courses;

  const courseToInstructor = {
    "Computer Science": "John Rey Silverio",
    "Information Technology": "John Rey Silverio",
    "Software Engineering": "John Rey Silverio",
    "Data Science": "Maria Santos",
    "Cybersecurity": "Carlos Dela Cruz"
  };

  output.innerHTML = '';

  const sTitle = createElement('h2', 'Students:');
  output.appendChild(sTitle);
  const sList = createElement('ul', null, 'list');
  studentsArr.forEach(st => {
    const li = createElement('li');
    const star = st.age > 21 ? ' *' : '';
    li.innerHTML = `${st.name} (${st.age}) - ${st.course}${
      star ? `<span class="student-star">${star}</span>` : ''
    }`;
    sList.appendChild(li);
  });
  output.appendChild(sList);

  const cTitle = createElement('h2', 'Courses:');
  output.appendChild(cTitle);
  const cList = createElement('ul', null, 'list');
  coursesArr.forEach(c => {
    const li = createElement('li');
    li.innerHTML = `<strong>${c.title}</strong>: ${c.description}`;
    cList.appendChild(li);
  });
  output.appendChild(cList);

  const iTitle = createElement('h2', 'Instructors:');
  output.appendChild(iTitle);
  const iList = createElement('ul', null, 'list');
  instructorsArr.forEach(i => {
    const li = createElement('li', `${i.name} - ${i.subject}`);
    iList.appendChild(li);
  });
  output.appendChild(iList);
}

function fetchDataWithThen() {
  fetch('data/students.json')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      console.log('Fetched with .then:', data);
    })
    .catch(err => {
      console.error('.then fetch error', err);
    });
}

async function fetchDataAsyncAndRender() {
  try {
    const res = await fetch('data/students.json');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    console.log('Fetched with async/await:', data);
    renderData(data);
  } catch (err) {
    console.error('async fetch error', err);
    output.innerHTML = '<p>Failed to load data.</p>';
  }
}

fetchDataWithThen();
fetchDataAsyncAndRender();
