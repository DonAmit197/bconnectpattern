let formelem = document.getElementById("formio");

let nextPageAction = function (wizard) {
  wizard.on("nextPage", function (page) {
    console.log(page.submission.data);
  });
};
let pdfExport = function (element) {
  html2PDF(element, {
    jsPDF: {
      format: "a4",
    },
    imageType: "image/jpeg",
    output: "./pdf/generate.pdf",
  });
};
function clickEvent() {
  let BTN = document.querySelector("#fileDow");
  let clonedForm = document.querySelector("#clonedForm");
  //console.log(clonedForm.innerHTML);
  BTN.addEventListener("click", () => {
    pdfExport(document.querySelector("#clonedForm"));
  });
}

let getallPages = function (form) {
  let alpppages = form.allPages;
  for (let i in alpppages) {
    let j = alpppages[i];
    for (let k in j) {
      console.log(j[k]);
    }
  }
};
let pdfFormInit = (data, submit) => {
  // changing to form
  var pdfForm = {
    components: bcPattern.components,
    display: "form",
  };

  // console.log(simpleForm.display);
  Formio.createForm(document.querySelector("#clonedForm"), bcPattern, {
    readOnly: true,
  }).then(function (element) {
    element.submission = data;
  });
};

let setSubmissionStorage = (submission) => {
  window.localStorage.setItem("set_submission", submission);
};
window.onload = function () {
  Formio.use(gds);

  Formio.createForm(document.querySelector("#formio"), bcPattern).then(
    function (form) {
      nextPageAction(form);

      form.on("submit", function (submission) {
        console.log(JSON.stringify(submission));
        var jsonString = JSON.stringify(submission);
        console.log(form);

        setSubmissionStorage(JSON.stringify(submission));
        pdfFormInit(form, JSON.stringify(submission), true);
        //console.log(form.form);

        //getallPages(form);
        //pdfExport(form.element);
        //pdfExport(document.querySelector("#clonedForm"));
        // form.everyComponent((component) => {
        //   console.log(component.element);
        // });
        clickEvent();
      });
    }
  );
  pdfFormInit();
};
