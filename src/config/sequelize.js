const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const userModel = require('../models/User')
const classModel = require('../models/ClassRoom')
const meetingModel = require('../models/Meeting')
const fileModel = require('../models/File')
const postModel = require('../models/Post')
const commentModel = require('../models/Comment')
const groupChatModel = require('../models/GroupChat')
const messageModel = require('../models/Message')
const groupsMembersModel = require('../models/Groups_Members')
const studentsClassRoomsModel = require('../models/Students_ClassRooms')
dotenv.config();
/**
 * database connection
 */

const sequelize = new Sequelize(process.env['DB_NAME'], process.env['PG_ADMIN'], process.env['PG_PASSWORD'], {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }
);

const User = userModel(sequelize, Sequelize)
const ClassRoom = classModel(sequelize, Sequelize)
const Meeting = meetingModel(sequelize, Sequelize)
const File = fileModel(sequelize, Sequelize)
const Post = postModel(sequelize, Sequelize)
const Comment = commentModel(sequelize, Sequelize)
const GroupChat = groupChatModel(sequelize, Sequelize)
const Message = messageModel(sequelize, Sequelize)
const Groups_Members = groupsMembersModel(sequelize, Sequelize)
const Students_ClassRooms = studentsClassRoomsModel(sequelize, Sequelize)


//ClassRoom have exactly 1 staff and 1 tutor and one staff/tutor can have many classrooms
ClassRoom.belongsTo(User, { as: 'Tutor', foreignKey: 'TutorId' })
User.hasMany(ClassRoom, {as: 'TutorClass', foreignKey: 'TutorId'})
ClassRoom.belongsTo(User, { as: 'Staff', foreignKey: 'StaffId' })
User.hasMany(ClassRoom, {as: 'StaffClass', foreignKey: 'StaffId'})

//Many-to-Many association StudentClassRoom
ClassRoom.belongsToMany(User, { as: 'Students', through: Students_ClassRooms, foreignKey: 'classId' })
User.belongsToMany(ClassRoom, { through: Students_ClassRooms, foreignKey: 'studentId' })

//Each meeting is for 1 class
Meeting.belongsTo(ClassRoom, { foreignKey: 'classId' })
ClassRoom.hasMany(Meeting, { foreignKey: 'classId' })

//file registered by an user and belongs to specific class and post
File.belongsTo(ClassRoom)
ClassRoom.hasMany(File)
File.belongsTo(User)
User.hasMany(File)
File.belongsTo(Post)
Post.hasMany(File)

//Post is posted by specific user and belongs to specific class
Post.belongsTo(ClassRoom)
ClassRoom.hasMany(Post)
Post.belongsTo(User)
User.hasMany(Post)

//Comment belongs to a post and written by an user
Comment.belongsTo(User)
Comment.belongsTo(Post)
Post.hasMany(Comment)

//Message belongs to a group and sended by an user
Message.belongsTo(User)
User.hasMany(Message)
Message.belongsTo(GroupChat)
GroupChat.hasMany(Message)


//Many-toMany association GroupsMembers
GroupChat.belongsToMany(User, { as: 'Members', through: Groups_Members, foreignKey: 'groupId' })
User.belongsToMany(GroupChat, {through: Groups_Members, foreignKey: 'memberId' })

/**
 * sync database
 */
sequelize.sync({ force: false })
.then(() => {
  console.log('Database & table created')
})


module.exports = {
  User,
  Message,
  GroupChat,
  Groups_Members,
  ClassRoom,
  Meeting,
  File,
  Post,
  Comment,
  Students_ClassRooms,
  Sequelize,
  sequelize
}