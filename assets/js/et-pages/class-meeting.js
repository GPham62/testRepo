
/**
 * DOM elements
 */
const $addNewMeetingBtn = document.getElementById('et-add-new-meeting-btn')
const $meetingDurationInput = document.getElementById('et-meeting-duration-input')
const $meetingNameInput = document.getElementById('et-meeting-name-input')
const $meetingStartTimeInput = document.getElementById('kt_datetimepicker_2')
const $modalAddNewMeeting = document.getElementById('et_modal_add_new_meeting')
const $meetingContainer = document.getElementById('et-meeting-container')

const classId = window.location.pathname.split("/")[2]

/**
 * hide add post button
 */
$addPostBtn.style.display = 'none'

/**
 * change color of navigation anchor
 */
$redirectClassStream.style.color = '#959cb6'
$redirectClassPeople.style.color = '#959cb6'
$redirectClassMeeting.style.color = '#5d78ff'
/**
 * initially render all meetings
 */
$.ajax({
    url: '/meeting/findMeetingsByClassId',
    method: 'POST',
    data: { classId }
}).done(data => {
    if(data.status){
        console.log(data.meetings)
        let meetings = data.meetings
        let currentDate = ''

        meetings.forEach(meeting => {
            if(meeting.startTimeDate != currentDate){
                currentDate = meeting.startTimeDate
                renderDayHeading({dayOfWeek: meeting.startTimeDay, date: meeting.startTimeDate})
            }
            renderMeetingItem({time: meeting.startTimeTime, meetingName: meeting.name, meetingDes: meeting.duration })
        })

    }else{
        console.log(data.message)
    }
})
/**
 * Add new meeting
 */
$addNewMeetingBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let meetingName = $meetingNameInput.value
    let meetingDuration = $meetingDurationInput.value
    let meetingStartTime = $meetingStartTimeInput.value

    console.log(meetingName, meetingDuration, meetingStartTime)
    
    $.ajax({
        url: '/meeting/add',
        method: "POST",
        data: { classId, meetingName, meetingDuration, meetingStartTime }
    }).done(data => {
        if(data.status){
            location.reload()
        }else{
            console.log(data.message)
        }
    })
})
/**
 * hide et_modal_add_new_meeting
 */
function hideAndClearMeetingModal(){
    $meetingNameInput.value = ''
    $meetingDurationInput.value = ''
    $meetingStartTimeInput.value = ''
    $modalAddNewMeeting.style.display = 'none'
    if (document.querySelector('.modal-backdrop')) document.body.removeChild(document.querySelector('.modal-backdrop'))
}
/**
 * render day heading
 */
function renderDayHeading({dayOfWeek, date}){
    let $dayHeading = document.createElement('tr')
    $dayHeading.classList.add('fc-list-heading')
    $dayHeading.innerHTML = `<td class="fc-widget-header" colspan="3">
                                <a class="fc-list-heading-main" data-goto="{&quot;date&quot;:&quot;2020-03-29&quot;,&quot;type&quot;:&quot;day&quot;}">${dayOfWeek}</a>
                                <a class="fc-list-heading-alt" data-goto="{&quot;date&quot;:&quot;2020-03-29&quot;,&quot;type&quot;:&quot;day&quot;}">${date}</a>
                            </td>`
    $meetingContainer.appendChild($dayHeading)
}
/**
 * render meeting item
 */
function renderMeetingItem({time, meetingName, meetingDes }){
    let meetingItem = document.createElement('tr')
    meetingItem.classList.add('fc-list-item')
    meetingItem.classList.add('fc-event-brand')
    meetingItem.innerHTML = `<td class="fc-list-item-time fc-widget-content">${time}</td>
                            <td class="fc-list-item-marker fc-widget-content"><span
                                class="fc-event-dot"></span></td>
                            <td class="fc-list-item-title fc-widget-content"><a>${meetingName}</a>
                                <div class="fc-description">Duration: ${meetingDes} hours
                                </div>
                            </td>`
    $meetingContainer.appendChild(meetingItem)
}
