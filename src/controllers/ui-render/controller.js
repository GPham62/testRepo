class UIRender{

    renderDashboardPage(req, res){
        let currentUserRole = req.session.user.role

        if(currentUserRole == 'admin'){
            res.render('admin-dashboard', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: ['../js/et-pages/admin-dashboard.js'],
                isAdminOrStaff: true,
                isTutorOrStudent: false,
                isStudent: false,
                layout: 'main'
            })
        }else if(currentUserRole == 'staff'){
            res.render('staff-dashboard', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: ['../js/et-pages/staff-dashboard.js'],
                isAdminOrStaff: true,
                isTutorOrStudent: false,
                isStudent: false,
                layout: 'main'
            })
        }else if(currentUserRole == 'tutor'){
            res.render('tutor-dashboard', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: ['../js/et-pages/tutor-dashboard.js'],
                isAdminOrStaff: false,
                isTutorOrStudent: true,
                isStudent: false,
                layout: 'main'
            })
        }else if(currentUserRole == 'student'){
            res.render('student-dashboard', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: ['../js/et-pages/student-dashboard.js'],
                isAdminOrStaff: false,
                isTutorOrStudent: true,
                isStudent: true,
                layout: 'main'
            })
        }else{
            res.send({status: false})
        }
    }

    renderChatPage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }

        res.render('chat', {
            title: 'Etutoring',
            thisPageStyleSheets: ['../css/et-pages/chat.css'], 
            thisPageScripts: ['../js/et-pages/chat.js'],
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            layout: 'main'
        })
    }

    renderClassPage(req, res){
        res.send('welcome to class 1605')
    }

    renderStaffManaPage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }

        res.render('admin-staff-mana', {
            title: 'Etutoring',
            thisPageStyleSheets: ['../css/et-pages/admin-staff-mana.css'], 
            thisPageScripts: ['../js/et-pages/admin-staff-mana.js'],
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            layout: 'main'
        })
    }

    renderStaffDashboardPage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }
        res.render('admin-staff-dashboard', {
            title: 'Etutoring',
            thisPageStyleSheets: [], 
            thisPageScripts: [],
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            layout: 'main'
        })
    }

    renderClassStreamPage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }
        res.render('class-stream', {
            title: 'Etutoring',
            thisPageStyleSheets: ['../../css/pages/todo/todo.css'], 
            thisPageScripts: ['../../js/et-pages/class-stream.js'],
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            layout: 'class'
        })
    }

    renderClassListPage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false

        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }
        res.render('class-list', {
            title: 'Etutoring',
            thisPageStyleSheets: [], 
            thisPageScripts: ['../js/et-pages/class-list.js'],
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            layout: 'main'
        })   
    }

    renderManagementPage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }

        if(currentUserRole == 'admin'){
            res.render('admin-general-mana', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: ['../js/et-pages/admin-general-mana.js'],
                isAdminOrStaff,
                isTutorOrStudent,
                isStudent,
                layout: 'main'
            })               
        }else{
            res.render('staff-general-mana', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: ['../js/et-pages/staff-general-mana.js'],
                isAdminOrStaff,
                isTutorOrStudent,
                layout: 'main'
            }) 
        }
    }

    renderClassPeoplePage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }
        res.render('class-people', {
            title: 'Etutoring',
            thisPageStyleSheets: ['../../css/et-pages/class-people.css'], 
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            thisPageScripts: ['../../js/et-pages/class-people.js'],
            layout: 'class'
        })
    }

    renderClassMeetingPage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }
        res.render('class-meeting', {
            title: 'Etutoring',
            thisPageStyleSheets: [], 
            thisPageScripts: ['../../js/et-pages/class-meeting.js', '../../js/pages/crud/forms/widgets/bootstrap-datetimepicker.js'],
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            layout: 'class'
        })      
    }

    renderClassManaPage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }
        res.render('staff-class-mana', {
            title: 'Etutoring',
            thisPageScripts: ['../js/et-pages/staff-class-mana.js'],
            thisPageStyleSheets: [],
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            layout: 'main'
        })
    }

    renderClassStudentManaPage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }
        res.render('class-student-mana', {
            title: 'Etutoring',
            thisPageScripts: ['../js/et-pages/class-student-mana.js'],
            thisPageStyleSheets: [],
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            layout: 'main'
        })
    }
    
    renderUserManaPage(req, res){
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }
        res.render('staff-user-mana', {
            title: 'Etutoring',
            thisPageScripts: ['../js/et-pages/staff-user-mana.js'],
            thisPageStyleSheets: [],
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            layout: 'main'
        })
    }

    renderStudentAssignmentPage(req, res) {
        let currentUserRole = req.session.user.role
        let isAdminOrStaff = false
        let isTutorOrStudent = false
        let isStudent = false

        if(currentUserRole == "student") isStudent = true

        if(currentUserRole == 'admin' || currentUserRole == 'staff'){
            isAdminOrStaff = true
        }else{
            isTutorOrStudent = true
        }
        res.render('staff-class-mana-student-assign', {
            title: 'Etutoring',
            thisPageScripts: ['../js/et-pages/staff-class-mana-student-assign.js'],
            thisPageStyleSheets: [],
            isAdminOrStaff,
            isTutorOrStudent,
            isStudent,
            layout: 'main'
        })
    }

}
module.exports = new UIRender()