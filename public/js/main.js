// เลือกปุ่มใน sidebar
const menuItems = document.querySelectorAll('.menu-item');

// เลือกพื้นที่แสดงเนื้อหา
const contentDisplay = document.getElementById('content-display');

// ฟังก์ชั่นในการโหลดเนื้อหาจากไฟล์ภายนอก
function loadContent(contentFile) {
    fetch(contentFile)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        contentDisplay.innerHTML = data;  // แสดงเนื้อหาที่โหลดมา
      })
      .catch(error => {
        contentDisplay.innerHTML = '<p>Sorry, content could not be loaded.</p>';
        console.error('Error loading content:', error);
      });
  }
  
  // โหลด main.html โดยอัตโนมัติเมื่อหน้าโหลด
  window.addEventListener('load', () => {
    loadContent('pages/main/main.html');
  });
  
  // ฟังก์ชั่นเมื่อคลิกที่เมนูใน sidebar
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const contentFile = this.getAttribute('data-content');
      loadContent(contentFile);  // โหลดเนื้อหาตามที่คลิก
    });
  });