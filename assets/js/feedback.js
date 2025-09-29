document.addEventListener('DOMContentLoaded', () => {
  let currentRating = 0;
  const stars = document.querySelectorAll('.star');

  const validationModal = document.getElementById('validation-modal');
  const successModal    = document.getElementById('success-modal');

  const modalMessage = document.getElementById('modal-message');

  const validationCloseBtns = validationModal.querySelectorAll('.modal-close, .modal-ok-btn');
  const successCloseBtns    = successModal.querySelectorAll('.modal-close, .modal-ok-btn');

  function showValidationModal(message) {
    modalMessage.textContent = message;
    validationModal.style.display = 'block';
  }

  function showSuccessModal() {
    successModal.style.display = 'block';
  }

  function closeModals() {
    validationModal.style.display = 'none';
    successModal.style.display    = 'none';
  }

  validationCloseBtns.forEach((btn) => {
    btn.addEventListener('click', closeModals);
  });
  successCloseBtns.forEach((btn) => {
    btn.addEventListener('click', closeModals);
  });

  window.addEventListener('click', (e) => {
    if (e.target === validationModal || e.target === successModal) {
      closeModals();
    }
  });

  function updateStars(value) {
    stars.forEach((s) => {
      const v = parseInt(s.getAttribute('data-value'), 10);
      if (v <= value) {
        s.classList.add('selected');
      } else {
        s.classList.remove('selected');
      }
    });
  }

  stars.forEach((starElem) => {
    starElem.addEventListener('mouseover', () => {
      const hoverValue = parseInt(starElem.getAttribute('data-value'), 10);
      updateStars(hoverValue);
    });
    starElem.addEventListener('mouseout', () => {
      updateStars(currentRating);
    });
    starElem.addEventListener('click', () => {
      const value = parseInt(starElem.getAttribute('data-value'), 10);
      currentRating = value;
      updateStars(currentRating);
    });
  });

  const visitCountInput = document.getElementById('visit-count');
  visitCountInput.addEventListener('input', () => {
    if (visitCountInput.value.startsWith('-')) {
      visitCountInput.value = visitCountInput.value.replace('-', '');
    }
  });

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', () => {
    const fullName      = document.getElementById('full-name').value.trim();
    const email         = document.getElementById('email').value.trim();
    const phone         = document.getElementById('phone').value.trim();
    const dateVal       = document.getElementById('date').value.trim();
    const locationVal   = document.getElementById('location').value;
    const visitCountVal = document.getElementById('visit-count').value.trim();
    const feedback      = document.getElementById('feedback').value.trim();

    if (fullName === '') {
      showValidationModal('Full Name tidak boleh kosong.');
      return;
    }

    if (email === '' || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      showValidationModal('Mohon masukkan alamat email yang valid.');
      return;
    }

    if (phone === '' || isNaN(phone)) {
      showValidationModal('Mohon masukkan nomor telepon yang valid (angka saja).');
      return;
    }

    const genderEls = document.getElementsByName('gender');
    let genderChosen = false;
    for (let i = 0; i < genderEls.length; i++) {
      if (genderEls[i].checked) {
        genderChosen = true;
        break;
      }
    }
    if (!genderChosen) {
      showValidationModal('Mohon pilih gender Anda (Male atau Female).');
      return;
    }

    if (locationVal === '') {
      showValidationModal('Mohon pilih lokasi Anda.');
      return;
    }

    if (dateVal === '') {
      showValidationModal('Mohon pilih tanggal.');
      return;
    }

    if (
      visitCountVal === '' ||
      isNaN(visitCountVal) ||
      Number(visitCountVal) < 1
    ) {
      showValidationModal('Mohon masukkan jumlah kunjungan yang valid (minimal 1).');
      return;
    }

    const improvements = document.getElementsByName('improvement');
    let anyChecked = false;
    for (let i = 0; i < improvements.length; i++) {
      if (improvements[i].checked) {
        anyChecked = true;
        break;
      }
    }
    if (!anyChecked) {
      showValidationModal('Mohon centang minimal satu area yang perlu perbaikan.');
      return;
    }

    if (feedback === '') {
      showValidationModal('Mohon tuliskan feedback Anda.');
      return;
    }

    if (currentRating === 0) {
      showValidationModal('Mohon berikan rating dengan mengklik bintang.');
      return;
    }

    showSuccessModal();
    successCloseBtns.forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          document.getElementById('full-name').value = '';
          document.getElementById('email').value = '';
          document.getElementById('phone').value = '';
          genderEls.forEach((g) => (g.checked = false));
          document.getElementById('location').selectedIndex = 0;
          document.getElementById('date').value = '';
          document.getElementById('visit-count').value = '';
          improvements.forEach((cb) => (cb.checked = false));
          document.getElementById('feedback').value = '';
          currentRating = 0;
          updateStars(0);
        },
        { once: true }
      );
    });
  });
});
