"use strict";
/**
 * DOM Elements
 */
const $chatListBox = KTUtil.getByID('kt_chat_aside');
const $chatList = document.getElementById("et-chat-list")
const $messageBox = KTUtil.getByID('kt_chat_content');
const $messageList = document.getElementById('et-message-list')
const $messageScroll = KTUtil.find($messageBox, '.kt-scroll');
const $groupName = document.getElementById('et-group-name')
const $messageForm = document.getElementById('et-message-form')
const $messageText = document.getElementById('et-message-text')
const $searchChatBoxForm = document.getElementById('et-search-chat-box-form')
const $searchChatBoxInput = $('#et-search-chat-box-input')
const $searchList = document.getElementById('et-search-list')
const $searchName = document.getElementById('et-search-name')
const $searchResult = document.getElementById('et-search-result')
const $searchNotFound = document.getElementById('et-search-not-found')
const $chatListItems = $chatList.childNodes

let userGroupChats = []
let newGroup = false;

/**
 * Create socket io 
 */
let socket = io.connect("/chat")

/**
 * generate list of chatting users in the left chat list
 */
$.ajax({
    method: "GET",
    url: "/message/allChats",
})
.done(function (groups) {
    console.log(groups)
    groups.forEach((group, index) => {
        let chatItem = document.createElement('div')
        chatItem.setAttribute('group-id', group.groupId)
        chatItem.className = 'et-chat-item'
        if(index == 0) chatItem.classList.add('et-top-chat-item')
        chatItem.innerHTML =  `<div class="kt-widget__item">
                                    <span class="kt-media kt-media--circle">
                                        <img src="assets/media/users/300_9.jpg" alt="image">
                                    </span>
                                    <div class="kt-widget__info">
                                        <div class="kt-widget__section">
                                            <a href="#" class="kt-widget__username">${group.groupName}</a>
                                            <span class="kt-badge kt-badge--success kt-badge--dot"></span>
                                        </div>
                                        <span class="kt-widget__desc" id="et-latest-message-${group.groupId}">
                                            ${group.latestMessage}
                                        </span>
                                    </div>
                                </div>`
        $chatList.appendChild(chatItem)
        chatItem.addEventListener('click', (e) => {
            renderMessageBox({ groupId: group.groupId, groupName: group.groupName })
        })

        userGroupChats.push(group.groupId)
    })
    /**
     * add user to online user list and join user in its rooms/groups
     */
    socket.emit("joinOnline", { rooms: userGroupChats })
});

/**
 * generate recent messages of current right chat 
 */
function renderMessageBox({ groupId, groupName }){
    $.ajax({
		method: "POST",
		url: "/message/messages",
		data: { groupId }
	})
	.done(function ({ messages, currentUserId }) {
        console.log(messages)
        /**
         * render group name
         */
        $groupName.innerText = groupName
        /**
         * assgin group id to the right message box
         */
        $messageBox.setAttribute('group-id', groupId)
        /**
         * render recent messages
         */
        $messageList.innerHTML = ""
        messages.forEach(message => {
        let $messageItem = document.createElement('div')
            if(message.senderId != currentUserId){
                $messageItem.innerHTML = `<div class="kt-chat__message">
                                            <div class="kt-chat__user">
                                                <a href="#" class="kt-chat__username">${message.sender}</span></a>
                                            </div>
                                            <div class="kt-chat__text kt-bg-light-success">
                                                ${message.content}
                                            </div>
                                        </div>`                
            }else{
                $messageItem.innerHTML = `<div class="kt-chat__message kt-chat__message--right">
                                            <div class="kt-chat__user">
                                                <a href="#" class="kt-chat__username">Me</span></a>
                                            </div>
                                            <div class="kt-chat__text kt-bg-light-brand">
                                                ${message.content}
                                            </div>
                                        </div>`       
            }
            $messageList.appendChild($messageItem)   
        })
        $messageScroll.scrollTop = parseInt(KTUtil.css($messageList, 'height'));
	});
}
/**
 * initialize beautiful scroll bar for chat list box (left)
 */
function initChatListBoxScrollBar(){
    /**
     * Mobile offcanvas for mobile mode
     */
    let offcanvas = new KTOffcanvas($chatListBox, {
        overlay: true,  
        baseClass: 'kt-app__aside',
        closeBy: 'kt_chat_aside_close',
        toggleBy: 'kt_chat_aside_mobile_toggle'
    }); 
    /**
     * get scroll bar element within the chat box element
     */
    let scrollBarEl = KTUtil.find($chatListBox, '.kt-scroll');
    if (!scrollBarEl) {
        return;
    }
    /**
     *  Initialize perfect scrollbar
     */
    KTUtil.scrollInit(scrollBarEl, {
        mobileNativeScroll: true,  // enable native scroll for mobile
        desktopNativeScroll: false, // disable native scroll and use custom scroll for desktop 
        resetHeightOnDestroy: true,  // reset css height on scroll feature destroyed
        handleWindowResize: true, // recalculate hight on window resize
        rememberPosition: true, // remember scroll position in cookie
        height: function() {  // calculate height
            let height;
            let portletBodyEl = KTUtil.find($chatListBox, '.kt-portlet > .kt-portlet__body');
            let widgetEl = KTUtil.find($chatListBox, '.kt-widget.kt-widget--users');
            let searchbarEl = KTUtil.find($chatListBox, '.kt-searchbar');

            if (KTUtil.isInResponsiveRange('desktop')) {
                height = KTLayout.getContentHeight();
            } else {
                height = KTUtil.getViewPort().height;
            }

            if ($chatListBox) {
                height = height - parseInt(KTUtil.css($chatListBox, 'margin-top')) - parseInt(KTUtil.css($chatListBox, 'margin-bottom'));
                height = height - parseInt(KTUtil.css($chatListBox, 'padding-top')) - parseInt(KTUtil.css($chatListBox, 'padding-bottom'));
            }

            if (widgetEl) {
                height = height - parseInt(KTUtil.css(widgetEl, 'margin-top')) - parseInt(KTUtil.css(widgetEl, 'margin-bottom'));
                height = height - parseInt(KTUtil.css(widgetEl, 'padding-top')) - parseInt(KTUtil.css(widgetEl, 'padding-bottom'));
            }

            if (portletBodyEl) {
                height = height - parseInt(KTUtil.css(portletBodyEl, 'margin-top')) - parseInt(KTUtil.css(portletBodyEl, 'margin-bottom'));
                height = height - parseInt(KTUtil.css(portletBodyEl, 'padding-top')) - parseInt(KTUtil.css(portletBodyEl, 'padding-bottom'));
            }

            if (searchbarEl) {
                height = height - parseInt(KTUtil.css(searchbarEl, 'height'));
                height = height - parseInt(KTUtil.css(searchbarEl, 'margin-top')) - parseInt(KTUtil.css(searchbarEl, 'margin-bottom'));
            }

            // remove additional space
            height = height - 5;
            
            return height;
        } 
    });
}
initChatListBoxScrollBar()

/**
 * initialize beautiful scroll bar for chat message box (right)
 */
function initMessageBoxScrollBar(){
    var messageListEl = KTUtil.find($messageBox, '.kt-scroll');

    if (!messageListEl) {
        return;
    }

    // initialize perfect scrollbar(see:  https://github.com/utatti/perfect-scrollbar)
    KTUtil.scrollInit(messageListEl, {
        windowScroll: false, // allow browser scroll when the scroll reaches the end of the side
        mobileNativeScroll: true,  // enable native scroll for mobile
        desktopNativeScroll: false, // disable native scroll and use custom scroll for desktop
        resetHeightOnDestroy: true,  // reset css height on scroll feature destroyed
        handleWindowResize: true, // recalculate hight on window resize
        rememberPosition: true, // remember scroll position in cookie
        height: function() {  // calculate height
            var height;

            // Mobile mode
            if (KTUtil.isInResponsiveRange('tablet-and-mobile')) {
                return KTUtil.hasAttr(messageListEl, 'data-mobile-height') ? parseInt(KTUtil.attr(messageListEl, 'data-mobile-height')) : 300;
            }

            // Desktop mode
            if (KTUtil.isInResponsiveRange('desktop') && KTUtil.hasAttr(messageListEl, 'data-height')) {
                return parseInt(KTUtil.attr(messageListEl, 'data-height'));
            }

            var chatEl = KTUtil.find($messageBox, '.kt-chat');
            var portletHeadEl = KTUtil.find($messageBox, '.kt-portlet > .kt-portlet__head');
            var portletBodyEl = KTUtil.find($messageBox, '.kt-portlet > .kt-portlet__body');
            var portletFootEl = KTUtil.find($messageBox, '.kt-portlet > .kt-portlet__foot');

            if (KTUtil.isInResponsiveRange('desktop')) {
                height = KTLayout.getContentHeight();
            } else {
                height = KTUtil.getViewPort().height;
            }

            if (chatEl) {
                height = height - parseInt(KTUtil.css(chatEl, 'margin-top')) - parseInt(KTUtil.css(chatEl, 'margin-bottom'));
                height = height - parseInt(KTUtil.css(chatEl, 'padding-top')) - parseInt(KTUtil.css(chatEl, 'padding-bottom'));
            }

            if (portletHeadEl) {
                height = height - parseInt(KTUtil.css(portletHeadEl, 'height'));
                height = height - parseInt(KTUtil.css(portletHeadEl, 'margin-top')) - parseInt(KTUtil.css(portletHeadEl, 'margin-bottom'));
            }

            if (portletBodyEl) {
                height = height - parseInt(KTUtil.css(portletBodyEl, 'margin-top')) - parseInt(KTUtil.css(portletBodyEl, 'margin-bottom'));
                height = height - parseInt(KTUtil.css(portletBodyEl, 'padding-top')) - parseInt(KTUtil.css(portletBodyEl, 'padding-bottom'));
            }

            if (portletFootEl) {
                height = height - parseInt(KTUtil.css(portletFootEl, 'height'));
                height = height - parseInt(KTUtil.css(portletFootEl, 'margin-top')) - parseInt(KTUtil.css(portletFootEl, 'margin-bottom'));
            }

            // remove additional space
            height = height - 5;
            return height;
        }
    });
}
initMessageBoxScrollBar()

/**
 * handle search event
 */
$searchChatBoxForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let searchName = $searchChatBoxInput.val()
    let foundGroup = false
    /**
     * search group name in current chat list
     */
    for(let i = 0; i < $chatListItems.length;i++){
        let groupName = $chatListItems[i].querySelector(".kt-widget__username").innerText
        $chatListItems[i].classList.remove('et-top-chat-item')
        if(searchName == groupName){
            foundGroup = true
            $searchResult.style.display = 'flex'
            $searchName.innerText = groupName
            $chatListItems[i].classList.add('et-top-chat-item')
            break
        }
    }
    /**
     * if there is no group name existing, call api to search for user name
     */
    if(!foundGroup){
        $.ajax({
            url: '/user/findByName',
            method: "POST",
            data: { userName: searchName}
        }).then((data) => {
            if(data.status){
                $searchResult.style.display = 'flex'
                $searchName.innerText = searchName
                $searchResult.setAttribute('partner-id', data.userId)
                newGroup = true
            }else{
                $searchNotFound.style.display = 'flex'
            }
        })
    }
})
/**
 * hide/open search list box
 */
$searchChatBoxInput.bind('input', (e) => {
    if(e.target.value == ''){
        hideSearchListShowChatList()
    }else{
        hideChatListShowSearchList()
    }
})
/**
 * hide search list and show chat list 
 */
function hideSearchListShowChatList(){
    newGroup = false
    $searchChatBoxInput.val('')
    $searchResult.removeAttribute('group-id')
    $searchList.style.display = 'none'
    $searchResult.style.display = 'none'
    $searchNotFound.style.display = 'none'
    $chatList.style.display = 'block'
}
/**
 * hide chat list and show search list
 */
function hideChatListShowSearchList(){
    $chatList.style.display = 'none'
    $searchList.style.display = 'block'
}

/**
 * handle click on found chat item event
 */
    
$searchResult.addEventListener('click', () => {
    if(newGroup){
        let partnerId = $searchResult.getAttribute('partner-id')
        let memberIdList = [partnerId]
        
        let sendData = {
            groupName: null,
            memberIdList: memberIdList
        }

        $.ajax({
            url: '/group/createNewGroup',
            method:"POST",
            data: JSON.stringify(sendData),
            contentType: 'application/json'
        }).then((data) => {
            if(data.status){
                console.log(data.records)
                let groupId = data.records[0].groupId
                let groupName = $searchName.innerText
                hideSearchListShowChatList()
                renderMessageBox({groupId, groupName})
            }
        })
    }else{
        clickOnFoundChatItem()
    }
})
/**
 * 
 */
function clickOnFoundChatItem(){
    let $topChatItem = document.querySelector(".et-top-chat-item")
    $chatList.insertBefore($topChatItem, $chatListItems[0]);
    /**
     * render right message box
     */
    let groupId = $topChatItem.getAttribute('group-id')
    let groupName = $topChatItem.querySelector(".kt-widget__username").innerText

    hideSearchListShowChatList()
    renderMessageBox({groupId, groupName})
}
/**
 * handle send message event
 */
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let messageText = $messageText.value
    let groupId = $messageBox.getAttribute('group-id')

    $.ajax({
        url: 'message/addNewMessage',
        method: 'POST',
        data: { groupId, messageText, senderId: localStorage.getItem('userId') }
    }).done((stt) => {
        if(stt){
            $messageText.value = ''
            socket.emit('sendMessage', { groupId, messageText, senderId: localStorage.getItem('userId'), senderName: localStorage.getItem('userName')})
        }
    })

    
})

/**
 * listen to incoming message
 */
socket.on('incomingMessage', ({ groupId, messageText, senderId, senderName }) => {
    let currentUserId = localStorage.getItem('userId')
    let openedGroupId = $messageBox.getAttribute('group-id')
    /**
     * render incoming message in right message box (if it is currently open)
     */
    if(openedGroupId == groupId){
        let $messageItem = document.createElement('div')
        if(currentUserId != senderId){
            $messageItem.innerHTML = `<div class="kt-chat__message">
                                                <div class="kt-chat__user">
                                                    <a href="#" class="kt-chat__username">${senderName}</span></a>
                                                </div>
                                                <div class="kt-chat__text kt-bg-light-success">
                                                    ${messageText}
                                                </div>
                                            </div>` 
        }else{
            $messageItem.innerHTML = `<div class="kt-chat__message kt-chat__message--right">
                                                <div class="kt-chat__user">
                                                    <a href="#" class="kt-chat__username">Me</span></a>
                                                </div>
                                                <div class="kt-chat__text kt-bg-light-brand">
                                                    ${messageText}
                                                </div>
                                            </div>`
        }
        $messageList.appendChild($messageItem) 
        $messageScroll.scrollTop = parseInt(KTUtil.css($messageList, 'height'));
    }
    /**
     * render incoming message in left box
     */
    document.getElementById(`et-latest-message-${groupId}`).innerText = messageText

})

/**
 * listen to new group invitation
 */
socket.on('inviteToNewGroup', ({memberList, groupId, groupName}) => {
    let currentUserId = parseInt(localStorage.getItem('userId'))
    let isInvited = memberList.find(member => member.memberId == currentUserId)

    if(isInvited){
        socket.emit('joinNewGroup', { groupId }, function(){
            console.log('ban da join vao group moi')

            /**
             * check if chat is private or group of people
             */
            if(groupName == null){
                let partner = memberList.find(member => member.memberId != currentUserId)
                groupName = partner.memberName
            }
            let chatItem = document.createElement('div')
            chatItem.setAttribute('group-id', groupId)
            chatItem.classList.add('et-top-chat-item')
            chatItem.classList.add('et-chat-item')
            chatItem.innerHTML =  `<div class="kt-widget__item">
                                        <span class="kt-media kt-media--circle">
                                            <img src="assets/media/users/300_9.jpg" alt="image">
                                        </span>
                                        <div class="kt-widget__info">
                                            <div class="kt-widget__section">
                                                <a href="#" class="kt-widget__username">${groupName}</a>
                                                <span class="kt-badge kt-badge--success kt-badge--dot"></span>
                                            </div>
                                            <span class="kt-widget__desc" id="et-latest-message-${groupId}">
                                                You have joined new chat
                                            </span>
                                        </div>
                                    </div>`
            $chatList.appendChild(chatItem)
            $chatList.insertBefore(chatItem, $chatList.childNodes[0]);
            chatItem.addEventListener('click', (e) => {
                renderMessageBox({ groupId, groupName })
            })
    
            userGroupChats.push(groupId)
        })
    }
    
})

