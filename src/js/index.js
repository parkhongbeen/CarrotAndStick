
// DOMs
const $inputGithub = document.querySelector('.input-github');
const $btnOk = document.querySelector('.btn-ok');
const $btnClose = document.querySelector('.btn-close');
const $popup = document.querySelector('.popup');
const $overlay = document.querySelector('.overlay');
const $inputCommit = document.querySelector('.popup-daily-commit');
const $refresh = document.querySelector('.refresh');

const openPopup = () => {
  $popup.style.display = 'block';
  $overlay.style.display = 'block';
  $inputCommit.focus();
  $inputGithub.value = '';
};

const closePopup = () => {
  $popup.style.display = 'none';
  $overlay.style.display = 'none';
  $inputGithub.focus();
  $inputGithub.classList.remove('input-github-sucess');
  $inputGithub.classList.remove('input-github-error');
  $inputGithub.placeholder = 'Enter your GITHUB URL!';
};

const saveForcommit = () => {
  let saveGoal = 0;
  const $countGoalcommit = document.querySelector('.count-goal-number');
  const $warningText = document.querySelector('.warning-text');
  const regxr = /^([0-9]){1,3}$/;
  const regxrzero = /^[^0]/;
  const goalCommit = $inputCommit.value;
  $warningText.textContent = '';
  // console.log(regxrzero.test(goalCommit));

  if (regxr.test(goalCommit) && regxrzero.test(goalCommit)) {
    saveGoal = goalCommit;
    $countGoalcommit.textContent = saveGoal;
    closePopup();
  } else {
    $inputCommit.value = '';
    $warningText.textContent = '1부터 999 사이의 숫자를 입력해주세요.';
  }
};

// Events
$inputGithub.onkeyup = ({ keyCode }) => {
  const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=_-])(?=.*[0-9]).{6,16}$/;
  const testname = 'abc'; // 인풋 텍스트 닉네임

  if (keyCode !== 13) return;
  if ($inputGithub.value === '') {
    $inputGithub.classList.add('input-github-error');
    $inputGithub.placeholder = 'Please enter your Nickname.';
  } else if ($inputGithub.value === testname) {
    $inputGithub.classList.add('input-github-sucess');
    $inputGithub.placeholder = 'Thank you for using.';
    openPopup();
    $inputGithub.value = '';
  } else if ($inputGithub.value !== regExp) {
    $inputGithub.classList.add('input-github-error');
    $inputGithub.placeholder = 'This is not a valid Nickname.';
    $inputGithub.value = '';
  }
};

$btnOk.onclick = () => {
  saveForcommit();
};

$inputCommit.onkeyup = ({ keyCode }) => {
  if (keyCode !== 13) return;
  saveForcommit();
};

$btnClose.onclick = () => {
  closePopup();
};

// $refresh.onclick = () => {

// };