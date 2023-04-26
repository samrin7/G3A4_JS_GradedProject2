// Load the JSON file
var resumeData;
fetch("data/resume.json")
  .then((response) => response.json())
  .then((data) => {
    resumeData = data.resume;
    showResume(0);
  });

var filteredResumes = [];
var currentResumeIndex = 0;

// Show the data for a particular resume object
function showResume(index) {
  var resume = resumeData[index];
  currentResumeIndex = index;
  displayResume(resume);
}

function displayResume(resume) {
  document.getElementById("name").textContent = resume.basics.name;
  document.getElementById("applied-for").textContent = resume.basics.AppliedFor;
  document.getElementById("phone").textContent = resume.basics.phone;
  document.getElementById("email").textContent = resume.basics.email;
  document.getElementById("profiles").innerHTML = `<a href="${resume.basics.profiles.url}">LinkedIn</a>`;
  const location = resume.basics.location;
  let locationText = "";
  for (const property in location) {
    locationText += `${location[property]}&nbsp`;
  }
  const locationField = document.getElementById("address");
  locationField.innerHTML = locationText;
  const skills = resume.skills.keywords
    .map((keyword) => `<p>${keyword}</p>`)
    .join("");
  document.getElementById("skills").innerHTML = skills;
  const hobbies = resume.interests.hobbies
    .map((hobby) => `<p>${hobby}</p>`)
    .join("");
  document.getElementById("interests").innerHTML = hobbies;
  const work = resume.work;
  let workText = "";
  for (const property in work) {
    workText += `<p><strong>${property}:</strong> ${work[property]}</p>`;
  }
  const workField = document.getElementById("work");
  workField.innerHTML = workText;
  const intern = resume.Internship;
  let internText = "";
  for (const property in intern) {
    internText += `<p><strong>${property}:</strong> ${intern[property]}</p>`;
  }
  const internField = document.getElementById("internship");
  internField.innerHTML = internText;

  const project = resume.projects;
  let projectText = "";
  for (const property in project) {
    projectText += `<p><strong>${property}:</strong> ${project[property]}</p>`;
  }
  const projecctField = document.getElementById("projects");
  projecctField.innerHTML = projectText;

  const education = resume.education;
  document.getElementById("ug").innerHTML = `${education.UG.course} from ${education.UG.institute} (${education.UG["Start Date"]} - ${education.UG["End Date"]}), CGPA: ${education.UG.cgpa}`;
  document.getElementById("senior-secondary").innerHTML = `Senior Secondary from ${education["Senior Secondary"].institute}, CGPA: ${education["Senior Secondary"].cgpa}`;
  document.getElementById(
    "high-school"
  ).innerHTML = `High School from ${education["High School"].institute}, CGPA: ${education["High School"].cgpa}`;

  const achievements = resume.achievements.Summary;
  const achievementsList = document.getElementById("achievements");
  achievementsList.innerHTML = "";
  achievements.forEach((achievement) => {
    const listItem = document.createElement("li");
    listItem.textContent = achievement;
    achievementsList.appendChild(listItem);
  });
}

function clearContent() {
  document.getElementById("wrapper").textContent =
    "No such results found";
  document.getElementsByClassName("navigation")[0].style.display = "none";
}

//Search function:

function searchResume() {
  document.getElementById("searchResult").innerHTML = ""; // Clear the error message
  const query = document.getElementById("searchInput").value.toLowerCase();
  filteredResumes = resumeData.filter((resume) => {
    const appliedFor = resume.basics.AppliedFor.toLowerCase();
    return appliedFor.includes(query);
  });

  if (filteredResumes.length > 0) {
    if (filteredResumes.length === 1) {
      // Hide the "Previous" and "Next" buttons
      document.getElementsByClassName("navigation")[0].style.display = "none";
    } else {
      // Show the "Previous" and "Next" buttons
      document.getElementsByClassName("navigation")[0].style.display = "block";
    }
    currentResumeIndex = 0;
    displayResume(filteredResumes[currentResumeIndex]);
  } else {
    clearContent();
  }
}

// Handle the click event for the "Previous" button
function prevResume() {
  if (filteredResumes.length > 0) {
    if (currentResumeIndex > 0) {
      currentResumeIndex--;
      displayResume(filteredResumes[currentResumeIndex]);
    }
  } else {
    if (currentResumeIndex > 0) {
      currentResumeIndex--;
      displayResume(resumeData[currentResumeIndex]);
    }
  }
}

// Handle the click event for the "Next" button
function nextResume() {
  if (filteredResumes.length > 0) {
    if (currentResumeIndex < filteredResumes.length - 1) {
      currentResumeIndex++;
      displayResume(filteredResumes[currentResumeIndex]);
    }
  } else {
    if (currentResumeIndex < resumeData.length - 1) {
      currentResumeIndex++;
      displayResume(resumeData[currentResumeIndex]);
    }
  }
}
