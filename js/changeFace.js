let gitCount = 2;
const $moominForm = document.querySelector('.moomin-form');
const $vision = document.querySelector('.vision');
const $angryEye = document.querySelector('.angry-eye');
const $angryAdd = document.querySelector('.angry-add');
const $angryMark = document.querySelectorAll('.angry-mark');

$moominForm.onclick = () => {
  gitCount = 4;
  console.dir($angryMark);
  if (gitCount == 4) {
    $vision.style.display = 'none';
    $angryEye.style.display = 'block';
    $angryAdd.classList.add('angry-div');
    $angryMark[0].style.display = 'block';
    $angryMark[1].style.display = 'block';
  }
}