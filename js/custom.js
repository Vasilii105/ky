// год
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// изотоп
$(window).on('load', function () {
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
            columnWidth: ".all"
        }
    })
});

// селект
$(document).ready(function() {
    $('select').niceSelect();
    

    $('#phoneNumber').mask('+7 (000) 000-00-00', {
        placeholder: "+7 (___) ___-__-__"
    });
    

    $('#phoneNumber').on('input', function() {
        var phone = $(this).val();
        var phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        
        if (phone && phone !== '+7 (___) ___-__-__') {
            if (phoneRegex.test(phone)) {
                $(this).removeClass('invalid').addClass('valid');
            } else {
                $(this).removeClass('valid').addClass('invalid');
            }
        } else {
            $(this).removeClass('valid invalid');
        }
    });
    
    // 3 дня вперед
    function setMinDate() {
        var today = new Date();
        var minDate = new Date(today);
        minDate.setDate(today.getDate() + 3);
        
        // формат даты
        var year = minDate.getFullYear();
        var month = String(minDate.getMonth() + 1).padStart(2, '0');
        var day = String(minDate.getDate()).padStart(2, '0');
        var formattedDate = year + '-' + month + '-' + day;
        
        $('#appointmentDate').attr('min', formattedDate);
    }
    
    // мин дата
    setMinDate();
    
    // выходные
    $('#appointmentDate').on('change', function() {
        var selectedDate = new Date(this.value);
        var dayOfWeek = selectedDate.getDay(); // 0 = воскресенье, 6 = суббота
        
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            alert('Извините, но мы не работаем по выходным дням (суббота и воскресенье). Пожалуйста, выберите рабочий день.');
            this.value = '';
            return false;
        }
    });
  });

/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}


$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    dots: true,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
});

// заявка
$(document).ready(function() {
    // проверка
    function validateForm() {
        var name = $('.form_container input[placeholder="Ваше имя"]').val().trim();
        var phone = $('#phoneNumber').val().trim();
        var car = $('#carModel').val();
        var date = $('#appointmentDate').val();
        
        if (!name) {
            alert('Пожалуйста, введите ваше имя');
            return false;
        }
        
        if (!phone || phone === '+7 (___) ___-__-__') {
            alert('Пожалуйста, введите номер телефона');
            return false;
        }
        
        // телефон
        var phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(phone)) {
            alert('Пожалуйста, введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX');
            return false;
        }
        
        if (!car) {
            alert('Пожалуйста, выберите марку и модель машины');
            return false;
        }
        
        if (!date) {
            alert('Пожалуйста, выберите дату');
            return false;
        }
        
        // 3 дня
        var selectedDate = new Date(date);
        var today = new Date();
        var minDate = new Date(today);
        minDate.setDate(today.getDate() + 3);
        minDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < minDate) {
            alert('Дата должна быть не ранее чем через 3 дня от сегодняшнего дня');
            return false;
        }
        
        return true;
    }
    
    $('#submitApplication').click(function() {
        if (validateForm()) {
            
            $('#notificationModal').modal('show');
            
            
            $('.form_container input').val('');
            $('#carModel').val('');
            
            // сброс
            setMinDate();
        }
    });
});

// JDM слайдер
$(".jdm_owl-carousel").owlCarousel({
    items: 3,
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive:{
        0:{items:1},
        600:{items:2},
        1000:{items:3}
    }
});