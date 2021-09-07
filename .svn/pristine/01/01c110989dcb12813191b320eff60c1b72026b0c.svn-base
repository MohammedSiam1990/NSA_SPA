

app.factory('contactUsService', ['$http', 'ngAuthSettings',
    function ($http, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var serviceFactory = {};

        function _getApplications() {
            return $http.get(serviceBase + "Profile/ListAllProfiles");
        }

        function _create(model) {
            return $http.post(serviceBase + "Ticket", model);
        }

        function _createAnonymous(model) {
            return $http.post(serviceBase + "Ticket/CreateAnonymousTicket", model);
        }

        function _uploadTempAttachment(model) {
            return $http.post(serviceBase + "Ticket/UploadTempAttachment", model, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            });
        }

        serviceFactory.getApplications = _getApplications;
        serviceFactory.create = _create;
        serviceFactory.createAnonymous = _createAnonymous;
        serviceFactory.uploadTempAttachment = _uploadTempAttachment;

        return serviceFactory;
    }]);

app.controller('contactUsController', ['$scope', '$timeout', 'contactUsService', 'ngAuthSettings',
    function ($scope, $timeout, contactUsService, ngAuthSettings) {

        $scope.loggedInUser = null;
        $scope.newAttachmentPath = null;
        $scope.fileToUpload = null;
        $scope.lstApplications = [];
        $scope.errorMsg = "";
        $scope.successMsg = "";

        $scope.lstCategories = [
            { id: 2, title: 'حالة الاعمال' },
            { id: 1, title: 'حالة تقنية' },
            { id: 3, title: 'استعلام' },
            { id: 4, title: 'شكوى' },
            { id: 5, title: 'طلب' },
            { id: 6, title: 'اخرى' }
        ];

        $(document).ready(function () {
            var authorizationUserAdminObj = localStorage.getItem('AuthorizationUserTempClient');
            if (authorizationUserAdminObj != null && authorizationUserAdminObj != undefined) {
                $scope.loggedInUser = JSON.parse(authorizationUserAdminObj);
                getAllApplications();
            }

            $("#fileAttachment").change(onFileChange);
        });

        function getAllApplications() {
            contactUsService.getApplications().then(res => {
                $scope.lstApplications = res.data;
            });
        }

        function onFileChange(event) {
            $timeout(function () {
                if (event.target.files.length === 0) {
                    $scope.fileToUpload = null;
                    $scope.newAttachmentPath = null;
                    return;
                }

                $scope.fileToUpload = event.target.files[0];
                if ($scope.fileToUpload.size / 1024 / 1024 > 5) {
                    clearUpload();
                    $scope.errorMsg = "حجم الملف تعدى ال 5 ميجا بايب";
                    return;
                }
            }, 0);
        }

        $scope.save = function () {
            $scope.successMsg = "";
            if (this.fileToUpload == null)
                createTicket();
            else
                uploadAttachment();
        }

        function createTicket() {
            var model = validateFieldsAndGetModel();

            if (model == null)
                return;

            if ($scope.loggedInUser != null) {
                contactUsService.create(model).then(data => {
                    clearFields();
                    $scope.successMsg = "تم اضافة تذكرة الدعم بنجاج";
                }).catch(error => {
                    console.log(error);
                });
            }
            else {
                contactUsService.createAnonymous(model).then(data => {
                    clearFields();
                    $scope.successMsg = "تم إنشاء تذكرة جديدة بنجاح ، وسوف نتصل بك قريبًا";
                }).catch(error => {
                    console.log(error);
                });
            }
        }

        function uploadAttachment() {
            var uploadData = new FormData();
            uploadData.append('file', $scope.fileToUpload);
            contactUsService.uploadTempAttachment(uploadData).then(
                res => {
                    $scope.newAttachmentPath = res.data;
                    createTicket();
                }).catch(error => {
                    $scope.fileToUpload = null;
                    $scope.newAttachmentPath = null;
                    console.log(error);
                });
        }

        function validateFieldsAndGetModel() {
            var txtFirstName = $("#txtFirstName");
            var txtLastName = $("#txtLastName");
            var txtPhone = $("#txtPhone");
            var txtEmail = $("#txtEmail");

            var selApplication = $("#selApplication");

            var selCategory = $("#selCategory");

            var txtTitle = $("#txtTitle");
            var txtDescription = $("#txtDescription");

            var model = {};
            var isValid = true;
            $scope.errorMsg = "";
            if ($scope.loggedInUser == null) {

                if (!isFieldValid(txtFirstName))
                    isValid = false;
                else
                    model.firstName = txtFirstName.val();

                if (!isFieldValid(txtLastName))
                    isValid = false;
                else
                    model.lastName = txtLastName.val();

                if (!isFieldValid(txtPhone) || !isValidPhonePattern(txtPhone))
                    isValid = false;
                else
                    model.phone = txtPhone.val();

                if (!isFieldValid(txtEmail) || !isValidEmailPattern(txtEmail))
                    isValid = false;
                else
                    model.email = txtEmail.val();
            }
            else {
                if (!isFieldValid(selApplication))
                    isValid = false;
                else
                    model.applicationId = selApplication.val();
            }

            if (!isFieldValid(selCategory))
                isValid = false;
            else
                model.category = selCategory.val();

            if (!isFieldValid(txtTitle))
                isValid = false;
            else
                model.title = txtTitle.val();

            if ($scope.fileToUpload != null && $scope.newAttachmentPath != null && $scope.newAttachmentPath != "")
                model.newAttachmentPath = $scope.newAttachmentPath;

            if (!isFieldValid(txtDescription))
                isValid = false;
            else
                model.description = txtDescription.val();

            if (!isValid) {
                $scope.errorMsg = "برجاء ملء الحقول المطلوبة";
                return null;
            }
            else if ($scope.loggedInUser == null) {
                if (!isValidPhonePattern(txtPhone)) {
                    isValid = false;
                    $scope.errorMsg = "رقم هاتف تذكرة الدعم غير صحيح";
                }

                if (!isValidEmailPattern(txtEmail)) {
                    isValid = false;
                    $scope.errorMsg = "البريد الالكترونى الخاص بتذكرة الدعم غير صحيح";
                }

                if (!isValid) {
                    return null;
                }
            }

            return model;
        }

        function isFieldValid(ctrl, pattern) {
            if (ctrl.val() == null || ctrl.val() == undefined || ctrl.val() == '') {
                ctrl.addClass("validate-red");
                return false;
            }
            else {
                ctrl.removeClass("validate-red");
                return true;
            }
        }

        function isValidPhonePattern(ctrl) {
            return isFieldValidPattern(ctrl, '^([0-9]{8})$');
        }

        function isValidEmailPattern(ctrl) {
            return isFieldValidPattern(ctrl, '^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+[\.][a-zA-Z0-9-.]{1,})$');
        }

        function isFieldValidPattern(ctrl, pattern) {
            var patt = new RegExp(pattern);
            if (!patt.test(ctrl.val())) {
                ctrl.addClass("validate-red");
                return false;
            } else {
                ctrl.removeClass("validate-red");
                return true;
            }
        }

        function clearUpload() {
            $scope.fileToUpload = null;
            $scope.newAttachmentPath = null;
            $("#attachmentfile").val('').change();
        }

        function clearFields() {
            $scope.errorMsg = "";
            $("#selApplication").removeClass('validate-red').val('');
            $("#txtFirstName").removeClass('validate-red').val('');
            $("#txtLastName").removeClass('validate-red').val('');
            $("#txtPhone").removeClass('validate-red').val('');
            $("#txtEmail").removeClass('validate-red').val('');
            $("#selCategory").removeClass('validate-red').val('');
            $("#txtTitle").removeClass('validate-red').val('');
            $("#txtAttachment").removeClass('validate-red').val('');
            $("#txtDescription").removeClass('validate-red').val('');
            clearUpload();
        }

    }]);