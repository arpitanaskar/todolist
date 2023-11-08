let add = document.getElementById('add');
let name = document.getElementById('name');
let desc = document.getElementById('desc');

let body = document.body;

const card = document.createElement('div');
card.id = 'card';

const remaining = document.createElement('div');
remaining.id = 'remaining';
const headerRem = document.createElement('div');
headerRem.innerHTML = '<br>' + 'REMAINING TASK';
remaining.appendChild(headerRem);
const ul = document.createElement('ul');
remaining.appendChild(ul);

// remaining.innerHTML = "<br>" + "REMAINING TASK"

const completed = document.createElement('div');
completed.id = 'completed';
const headerDone = document.createElement('div');
headerDone.innerHTML = '<br>' + 'COMPLETED TASK';
completed.appendChild(headerDone);
const uldone = document.createElement('ul');
completed.appendChild(uldone);

body.appendChild(card);
card.appendChild(remaining);
card.appendChild(completed);

const apiRem = 'https://crudcrud.com/api/2e25220dde23415c8b62619f6a5db329/rem';
const apiDone =
  'https://crudcrud.com/api/2e25220dde23415c8b62619f6a5db329/done';

//Storing data in the API
function storeData(event) {
  event.preventDefault();

  var obj = {
    name: name.value,
    desc: desc.value,
  };

  axios
    .post(apiRem, obj)
    .then((r) => {
      console.log(r);
      showResponse(obj);
    })
    .catch((e) => console.log(e));
}

//Show Response of Remaining Task
function showResponse(obj) {
  let text = document.createTextNode(
    `Name: ${obj.name} Description: ${obj.desc}`
  );
  let li = document.createElement('li');
  li.appendChild(text);

  let done = document.createElement('button');
  done.innerHTML = 'done';
  li.appendChild(done);

  let cancel = document.createElement('button');
  cancel.innerHTML = 'delete';
  li.appendChild(cancel);

  ul.appendChild(li);

  done.onclick = () => {
    axios
      .post(apiDone, obj)
      .then((r) => {
        console.log(r);
        // Delete item from rem
        deleteItem(obj._id);
      })
      .catch((e) => console.log(e));
  };

  cancel.onclick = () => {
    deleteItem(obj._id);
  };
}

function deleteItem(id) {
  axios
    .delete(`${apiRem}/${id}`)
    .then(() => {
      fetchDataDisplayRem();
      fetchDataDisplayDone();
    })
    .catch((e) => {
      console.log(e);
    });
}

//Fetch Data Display Remaining
function fetchDataDisplayRem() {
  axios
    .get(apiRem)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
        let text = document.createTextNode(
          `Name: ${response.data[i].name} Description: ${response.data[i].desc}`
        );
        let li = document.createElement('li');
        li.appendChild(text);

        uldone.appendChild(li);
      }
    })
    .catch((e) => console.log(e));
}

//DOMContent
window.addEventListener('DOMContentLoaded', fetchDataDisplayRem);

//Fetch Data Display Done
function fetchDataDisplayDone() {
  axios
    .get(apiDone)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        console.log("done", response.data[i]);
        // showResponse(response.data[i]);
      }
    })
    .catch((e) => console.log(e));
}

//DOMContent
window.addEventListener('DOMContentLoaded', fetchDataDisplayDone);

add.addEventListener('click', storeData);
