const { User, GroupChat, Message } = require('../../config/sequelize')
class MessageController{
    findAllMessagesByGroupId(req, res){
        let groupId = req.body.groupId
        GroupChat.findOne({
            where: { id: groupId },
            include: {
                model: Message,
                include: [{model: User}]
            }
        })
        .then((group) => {
            let allMessages = group.Messages
            let detailedMessages = []
            allMessages.forEach(msg => {
                detailedMessages.push({
                    sender: msg.dataValues.User.dataValues.name,
                    content: msg.dataValues.content,
                    senderId: msg.dataValues.UserId
                })
            })
            res.send({ messages: detailedMessages, currentUserId: req.session.user.userId})
        })
    }
    findAllGroupChatsByUserId(req, res){
        let currentUserId = req.session.user.userId
        User.findOne({
            where: {id: currentUserId},
            include: [
                {
                    model: GroupChat,
                    include: [{model: User, as: "Members"}, {model: Message}]
                }
            ]
        })
        .then((user) => {
            
            let groupChats = user.dataValues.GroupChats
            let detailedGroupChats = []

            if(groupChats.length != 0){
                groupChats.forEach(group => {
                    let detailedGroupChat = {groupId: group.id}
                    if(group.name == null){
                        let partner = group.Members.find(member => member.dataValues.id != currentUserId)
                        detailedGroupChat.groupName = partner.dataValues.name
                    }else{
                        detailedGroupChat.groupName = group.name
                    }
                    let allMessages = group.Messages
                    let nMessages = allMessages.length
                    if(nMessages != 0){
                        detailedGroupChat.latestMessage = allMessages[nMessages - 1].dataValues.content                        
                    }else{
                        detailedGroupChat.latestMessage = 'You have joined new chat'
                    }
                    detailedGroupChats.push(detailedGroupChat)

                });                
            }

            res.send(detailedGroupChats)                     
        })
    }
    addNewMessage(req, res){
        let { groupId, senderId, messageText } = req.body 

        Message.create({
            content: messageText,
            UserId: senderId,
            GroupChatId: groupId
        }).then(newMessage => {
            if(newMessage) res.send(true)
        })
    }
}
module.exports = new MessageController()