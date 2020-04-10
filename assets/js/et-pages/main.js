/**
 * DOM Elements
 */

const $notiIcon = $('#et-noti-icon')
const $chatIcon = $('#et-chat-icon')
const $signOutBtn = $('#et-signout-btn')
const $personalTutorHref = document.getElementById('et-personal-tutor-href')

/**
 * handle click Personal Tutor in asidebar
 */
if($personalTutorHref){
    $.ajax({
        url:'/class/findClassRoomsByUserId',
        method: "POST",
        data: {userId: localStorage.getItem('userId'),role: localStorage.getItem('role')}
    }).done(classRooms => {
        let classId = classRooms[0].classId
        $personalTutorHref.href = `/class/${classId}/stream`
    })
}
/**
 * handle click notification icon
 */
$notiIcon.click((e) => {
    console.log('noti')
    console.log(e)
})

/**
 * handle click chat icon
 */
$chatIcon.click((e) => {
    window.location.href = '/chat'
})

/**
 * handle click sign out icon
 */
$signOutBtn.click((e) => {
    $.ajax({
		method: "GET",
		url: "/auth/logout",
	})
    .done(function (data) {
        if(data.status) {
            localStorage.removeItem('userId')
            localStorage.removeItem('userName')
            window.location.href = "/auth/login"
        }
    });
})
let noti_socket = io.connect("/notification")

