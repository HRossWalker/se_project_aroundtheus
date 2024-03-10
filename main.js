!function(){"use strict";var t=class{constructor(t,e,s){this._name=t.name,this._link=t.link,this._cardSelector=e,this._handleImageClick=s}_setEventListeners(){this._cardImageElement.addEventListener("click",(()=>this._handleImageClick(this))),this._likeIcon.addEventListener("click",(()=>this._handleLikeIcon())),this._trashIcon.addEventListener("click",(()=>this._handleDeleteCard()))}_handleLikeIcon(){this._likeIcon.classList.toggle("card__like-button_active")}_handleDeleteCard(){this._cardElement.remove(),this._cardElement=null}_getTemplate(){return this._cardElement=document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0),this._cardElement}getView(){return this._el=this._getTemplate(),this._cardTitleElement=this._cardElement.querySelector(".card__title"),this._cardTitleElement.textContent=this._name,this._cardImageElement=this._cardElement.querySelector(".card__image"),this._cardImageElement.src=this._link,this._cardImageElement.alt=this._name,this._likeIcon=this._cardElement.querySelector(".card__like-button"),this._trashIcon=this._cardElement.querySelector(".card__trash-button"),this._setEventListeners(),this._el}},e=class{constructor(t,e){this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formEl=e,this._inputList=[...this._formEl.querySelectorAll(this._inputSelector)],this._submitButton=this._formEl.querySelector(this._submitButtonSelector)}_setEventListeners(){this._inputList.forEach((t=>{t.addEventListener("input",(()=>{this._inputEl=t,this._checkInputValidity(t),this._toggleButtonState()}))}))}_showInputError(){this._errorMessageEl=document.querySelector(`#${this._inputEl.id}-error`),this._errorMessageEl.textContent=this._inputEl.validationMessage,this._inputEl.classList.add(this._inputErrorClass),this._errorMessageEl.classList.add(this._errorClass)}_checkInputValidity(){if(!this._inputEl.validity.valid)return this._showInputError();this._hideInputError()}_hideInputError(){this._errorMessageEl=document.querySelector(`#${this._inputEl.id}-error`),this._errorMessageEl.textContent="",this._inputEl.classList.remove(this._inputErrorClass),this._errorMessageEl.classList.remove(this._errorClass)}_toggleButtonState(){this._hasInvalidInput(this._inputList)?this._enableButton(this._inactiveButtonClass):this._disableButton(this._inactiveButtonClass)}_hasInvalidInput(){return!this._inputList.every((t=>t.validity.valid))}_enableButton(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0}_disableButton(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1}enableValidation(){this._formEl.addEventListener("submit",(t=>{t.preventDefault()})),this._setEventListeners()}resetValidation(){this._toggleButtonState(),this._inputList.forEach((t=>{this._inputEl=t,this._hideInputError()}))}},s=class{constructor(t){let{popupSelector:e}=t;this._modalEl=document.querySelector(e)}open(){this._modalEl.classList.add("modal_opened"),document.addEventListener("keyup",this._handleEsc)}close(){this._modalEl.classList.remove("modal_opened"),document.removeEventListener("keyup",this._handleEsc)}_handleEsc=t=>{"Escape"===t.key&&this.close()};setEventListeners(){this._modalEl.addEventListener("mousedown",(t=>{t.target.classList.contains("modal_opened")&&this.close(),t.target.classList.contains("modal__close")&&this.close()}))}},n=class extends s{constructor(t,e){super({popupSelector:t}),this._popupForm=this._modalEl.querySelector(".modal__form"),this._handleFormSubmit=e,this._list=[...this._popupForm.querySelectorAll(".modal__input")]}close(){this._popupForm.reset(),super.close()}_getInputValues(){const t={};return this._list.forEach((e=>{t[e.name]=e.value})),t}setEventListeners(){super.setEventListeners(),this._popupForm.addEventListener("submit",(()=>{this._handleFormSubmit(this._getInputValues())})),super.setEventListeners()}};const i=document.querySelector("#profile-edit-button"),r=document.querySelector("#modal-name-input"),o=document.querySelector("#modal-job-input"),a=document.querySelector("#card-add-button"),l=document.querySelector(".cards__list");const c={};var u;u={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__save-button",inactiveButtonClass:"modal__button-disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__input-error_visible"},Array.from(document.querySelectorAll(u.formSelector)).forEach((t=>{const s=new e(u,t),n=t.getAttribute("name");c[n]=s,s.enableValidation()}));const _=e=>new t(e,"#card-template",(()=>{console.log(e),d.open(e)})).getView(),d=new class extends s{constructor(t){super({popupSelector:t}),this._popupImage=document.querySelector(".modal__picture-view"),this._popupTitle=document.querySelector(".modal__picture-heading")}open(t){let{name:e,link:s}=t;this._popupImage.src=s,this._popupImage.alt=e,this._popupTitle.textContent=e,super.open()}}("#card-picture-modal");d.setEventListeners();const h=new class{constructor(t,e){let{data:s,renderer:n}=t;this._items=s,this._renderer=n,this._container=e}renderItems(){this._items.forEach((t=>{this._renderer(t)}))}addItem(t){this._container.prepend(t)}}({data:[{name:"Yosemite Valley",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"},{name:"Lake Louise",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"},{name:"Bald Mountains",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"},{name:"Latemar",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"},{name:"Vanoise National Park",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"},{name:"Lago di Braies",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"}],renderer:t=>{const e=_(t);h.addItem(e)}},l);h.renderItems();const m=new class{constructor(t,e){this._name=document.querySelector(t),this._job=document.querySelector(e)}getUserInfo(){return{name:this._name.textContent,job:this._job.textContent}}setUserInfo(t){let{name:e,job:s}=t;this._name.textContent=e,this._job.textContent=s}}(".profile__name",".profile__job"),p=new n("#profile-edit-modal",(t=>{p.close(),m.setUserInfo(t)}));p.setEventListeners();const E=new n("#card-add-modal",(t=>{console.log(t);const e=_(t);h.addItem(e),E.close()}));E.setEventListeners(),i.addEventListener("click",(()=>{c.profileForm.resetValidation();const t=m.getUserInfo();r.value=t.name,o.value=t.job,p.open()})),a.addEventListener("click",(()=>{c.addCardForm.resetValidation(),E.open()}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQWlCRixNQUFRN0YsRUFBS0ssS0FDOUIyRixFQUFnQkgsTUFBUTdGLEVBQUtxSSxJQUM3QkUsRUFBYTVELE1BQU0sSUFHckJzQixFQUFjckYsaUJBQWlCLFNBQVMsS0FDdEN1RixFQUE0QixZQUFFNUIsa0JBQzlCa0UsRUFBYTlELE1BQU0sRyIsInNvdXJjZXMiOlsid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhLCBjYXJkU2VsZWN0b3IsIGhhbmRsZUltYWdlQ2xpY2spIHtcclxuICAgIHRoaXMuX25hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLl9saW5rID0gZGF0YS5saW5rO1xyXG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xyXG4gICAgdGhpcy5faGFuZGxlSW1hZ2VDbGljayA9IGhhbmRsZUltYWdlQ2xpY2s7XHJcbiAgfVxyXG5cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9jYXJkSW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxyXG4gICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKHRoaXMpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2xpa2VJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLl9oYW5kbGVMaWtlSWNvbigpKTtcclxuXHJcbiAgICB0aGlzLl90cmFzaEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuX2hhbmRsZURlbGV0ZUNhcmQoKSk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlTGlrZUljb24oKSB7XHJcbiAgICB0aGlzLl9saWtlSWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZURlbGV0ZUNhcmQoKSB7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIF9nZXRUZW1wbGF0ZSgpIHtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZFNlbGVjdG9yKVxyXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcclxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRWaWV3KCkge1xyXG4gICAgdGhpcy5fZWwgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xyXG4gICAgdGhpcy5fY2FyZFRpdGxlRWxlbWVudCA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XHJcbiAgICB0aGlzLl9jYXJkVGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcclxuICAgIHRoaXMuX2NhcmRJbWFnZUVsZW1lbnQgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlRWxlbWVudC5zcmMgPSB0aGlzLl9saW5rO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlRWxlbWVudC5hbHQgPSB0aGlzLl9uYW1lO1xyXG4gICAgdGhpcy5fbGlrZUljb24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5fdHJhc2hJY29uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190cmFzaC1idXR0b25cIik7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9lbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcmQ7XHJcbiIsImNsYXNzIEZvcm1WYWxpZGF0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWwpIHtcclxuICAgIHRoaXMuX2Zvcm1TZWxlY3RvciA9IHNldHRpbmdzLmZvcm1TZWxlY3RvcjtcclxuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBzZXR0aW5ncy5pbnB1dFNlbGVjdG9yO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBzZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcclxuICAgIHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MgPSBzZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzO1xyXG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IHNldHRpbmdzLmVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9mb3JtRWwgPSBmb3JtRWw7XHJcbiAgICB0aGlzLl9pbnB1dExpc3QgPSBbLi4udGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5faW5wdXRTZWxlY3RvcildO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcclxuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2lucHV0RWwgPSBpbnB1dEVsO1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcclxuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX3Nob3dJbnB1dEVycm9yKCkge1xyXG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLl9pbnB1dEVsLmlkfS1lcnJvcmApO1xyXG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSB0aGlzLl9pbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xyXG4gICAgdGhpcy5faW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX2NoZWNrSW5wdXRWYWxpZGl0eSgpIHtcclxuICAgIGlmICghdGhpcy5faW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fc2hvd0lucHV0RXJyb3IoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKCk7XHJcbiAgfVxyXG5cclxuICBfaGlkZUlucHV0RXJyb3IoKSB7XHJcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMuX2lucHV0RWwuaWR9LWVycm9yYCk7XHJcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICB0aGlzLl9pbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIHRoaXMuX2Vycm9yTWVzc2FnZUVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZXJyb3JDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KHRoaXMuX2lucHV0TGlzdCkpIHtcclxuICAgICAgdGhpcy5fZW5hYmxlQnV0dG9uKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9kaXNhYmxlQnV0dG9uKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX2hhc0ludmFsaWRJbnB1dCgpIHtcclxuICAgIHJldHVybiAhdGhpcy5faW5wdXRMaXN0LmV2ZXJ5KChpbnB1dEVsKSA9PiBpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKTtcclxuICB9XHJcblxyXG4gIF9lbmFibGVCdXR0b24oKSB7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBfZGlzYWJsZUJ1dHRvbigpIHtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuXHJcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xyXG4gICAgICB0aGlzLl9pbnB1dEVsID0gaW5wdXRFbDtcclxuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcclxuIiwiY2xhc3MgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciB9KSB7XHJcbiAgICB0aGlzLl9tb2RhbEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcclxuICB9XHJcblxyXG4gIG9wZW4oKSB7XHJcbiAgICB0aGlzLl9tb2RhbEVsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5faGFuZGxlRXNjKTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5fbW9kYWxFbC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzYyk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlRXNjID0gKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgdGhpcy5jbG9zZSgpO1xyXG4gIH07XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fbW9kYWxFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XHJcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9vcGVuZWRcIikpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsX19jbG9zZVwiKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQb3B1cDtcclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcblxyXG5jbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcclxuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTtcclxuICAgIHRoaXMuX3BvcHVwRm9ybSA9IHRoaXMuX21vZGFsRWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcclxuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xyXG4gICAgdGhpcy5fbGlzdCA9IFsuLi50aGlzLl9wb3B1cEZvcm0ucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbF9faW5wdXRcIildO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEZvcm0ucmVzZXQoKTtcclxuICAgIHN1cGVyLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICAvLyBzZXRJbnB1dFZhbHVlcyhkYXRhKSB7XHJcbiAgLy8gICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAvLyAgICAgaW5wdXQudmFsdWUgPSBkYXRhW2lucHV0Lm5hbWVdO1xyXG4gIC8vICAgfSk7XHJcbiAgLy8gfVxyXG5cclxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XHJcbiAgICAvLyB0aGlzLnNldElucHV0VmFsdWVzKCk7XHJcbiAgICBjb25zdCBpbnB1dERhdGEgPSB7fTtcclxuICAgIHRoaXMuX2xpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgaW5wdXREYXRhW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgfVxyXG5cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLl9wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICB9KTtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhGb3JtO1xyXG4iLCIvLyBDQVJEIERBVEFcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXHJcbiAge1xyXG4gICAgbmFtZTogXCJZb3NlbWl0ZSBWYWxsZXlcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC95b3NlbWl0ZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFrZSBMb3Vpc2VcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9sYWtlLWxvdWlzZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiQmFsZCBNb3VudGFpbnNcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9iYWxkLW1vdW50YWlucy5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGF0ZW1hclwiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xhdGVtYXIuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIlZhbm9pc2UgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L3Zhbm9pc2UuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxhZ28gZGkgQnJhaWVzXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGFnby5qcGdcIixcclxuICB9LFxyXG5dO1xyXG5cclxuLy8gUFJPRklMRSBFTEVNRU5UU1xyXG5cclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWVkaXQtYnV0dG9uXCIpO1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZU5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWwtbmFtZS1pbnB1dFwiKTtcclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVKb2JJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWwtam9iLWlucHV0XCIpO1xyXG5cclxuLy9DQVJEIEVMRU1FTlRTXHJcblxyXG5leHBvcnQgY29uc3QgY2FyZEFkZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC1hZGQtYnV0dG9uXCIpO1xyXG5leHBvcnQgY29uc3QgY2FyZExpc3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkc19fbGlzdFwiKTtcclxuXHJcbi8vIFNFTEVDVE9SU1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcclxuICBmb3JtU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtXCIsXHJcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXHJcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19zYXZlLWJ1dHRvblwiLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX2J1dHRvbi1kaXNhYmxlZFwiLFxyXG4gIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxyXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0LWVycm9yX3Zpc2libGVcIixcclxufTtcclxuIiwiaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEltYWdlcyBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xyXG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcclxuaW1wb3J0IFwiLi4vcGFnZXMvaW5kZXguY3NzXCI7XHJcbmltcG9ydCB7XHJcbiAgaW5pdGlhbENhcmRzLFxyXG4gIGNhcmRBZGRCdXR0b24sXHJcbiAgcHJvZmlsZUVkaXRCdXR0b24sXHJcbiAgcHJvZmlsZU5hbWVJbnB1dCxcclxuICBwcm9maWxlSm9iSW5wdXQsXHJcbiAgY2FyZExpc3RFbGVtZW50LFxyXG4gIGNvbmZpZyxcclxufSBmcm9tIFwiLi4vdXRpbHMvdXRpbHMuanNcIjtcclxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xyXG5cclxuY29uc3QgZm9ybVZhbGlkYXRvcnMgPSB7fTtcclxuXHJcbmNvbnN0IGVuYWJsZVZhbGlkYXRpb24gPSAoY29uZmlnKSA9PiB7XHJcbiAgY29uc3QgZm9ybUxpc3QgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29uZmlnLmZvcm1TZWxlY3RvcikpO1xyXG4gIGZvcm1MaXN0LmZvckVhY2goKGZvcm1FbGVtZW50KSA9PiB7XHJcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihjb25maWcsIGZvcm1FbGVtZW50KTtcclxuICAgIGNvbnN0IGZvcm1OYW1lID0gZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcclxuICAgIGZvcm1WYWxpZGF0b3JzW2Zvcm1OYW1lXSA9IHZhbGlkYXRvcjtcclxuICAgIHZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5lbmFibGVWYWxpZGF0aW9uKGNvbmZpZyk7XHJcblxyXG5jb25zdCBjcmVhdGVDYXJkID0gKGNhcmRJdGVtKSA9PiB7XHJcbiAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKGNhcmRJdGVtLCBcIiNjYXJkLXRlbXBsYXRlXCIsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGNhcmRJdGVtKTtcclxuICAgIGltZ1BvcHVwLm9wZW4oY2FyZEl0ZW0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiBjYXJkLmdldFZpZXcoKTtcclxufTtcclxuXHJcbmNvbnN0IGltZ1BvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlcyhcIiNjYXJkLXBpY3R1cmUtbW9kYWxcIik7XHJcbmltZ1BvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5jb25zdCBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxyXG4gIHtcclxuICAgIGRhdGE6IGluaXRpYWxDYXJkcyxcclxuICAgIHJlbmRlcmVyOiAoZGF0YSkgPT4ge1xyXG4gICAgICBjb25zdCBjYXJkRWxlbWVudCA9IGNyZWF0ZUNhcmQoZGF0YSk7XHJcbiAgICAgIGNhcmRTZWN0aW9uLmFkZEl0ZW0oY2FyZEVsZW1lbnQpO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIGNhcmRMaXN0RWxlbWVudFxyXG4pO1xyXG5jYXJkU2VjdGlvbi5yZW5kZXJJdGVtcygpO1xyXG5cclxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oXCIucHJvZmlsZV9fbmFtZVwiLCBcIi5wcm9maWxlX19qb2JcIik7XHJcblxyXG5jb25zdCBwcm9maWxlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNwcm9maWxlLWVkaXQtbW9kYWxcIiwgKGRhdGEpID0+IHtcclxuICBwcm9maWxlUG9wdXAuY2xvc2UoKTtcclxuICB1c2VySW5mby5zZXRVc2VySW5mbyhkYXRhKTtcclxufSk7XHJcbnByb2ZpbGVQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuY29uc3QgbmV3Q2FyZFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjY2FyZC1hZGQtbW9kYWxcIiwgKGRhdGEpID0+IHtcclxuICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICBjb25zdCBjYXJkRm9ybUVsZW1lbnQgPSBjcmVhdGVDYXJkKGRhdGEpO1xyXG4gIGNhcmRTZWN0aW9uLmFkZEl0ZW0oY2FyZEZvcm1FbGVtZW50KTtcclxuICBuZXdDYXJkUG9wdXAuY2xvc2UoKTtcclxufSk7XHJcbm5ld0NhcmRQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBmb3JtVmFsaWRhdG9yc1tcInByb2ZpbGVGb3JtXCJdLnJlc2V0VmFsaWRhdGlvbigpO1xyXG4gIGNvbnN0IGRhdGEgPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xyXG4gIHByb2ZpbGVOYW1lSW5wdXQudmFsdWUgPSBkYXRhLm5hbWU7XHJcbiAgcHJvZmlsZUpvYklucHV0LnZhbHVlID0gZGF0YS5qb2I7XHJcbiAgcHJvZmlsZVBvcHVwLm9wZW4oKTtcclxufSk7XHJcblxyXG5jYXJkQWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgZm9ybVZhbGlkYXRvcnNbXCJhZGRDYXJkRm9ybVwiXS5yZXNldFZhbGlkYXRpb24oKTtcclxuICBuZXdDYXJkUG9wdXAub3BlbigpO1xyXG59KTtcclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcblxyXG5jbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XHJcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7XHJcbiAgICB0aGlzLl9wb3B1cEltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fcGljdHVyZS12aWV3XCIpO1xyXG4gICAgdGhpcy5fcG9wdXBUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3BpY3R1cmUtaGVhZGluZ1wiKTtcclxuICB9XHJcblxyXG4gIG9wZW4oeyBuYW1lLCBsaW5rIH0pIHtcclxuICAgIHRoaXMuX3BvcHVwSW1hZ2Uuc3JjID0gbGluaztcclxuICAgIHRoaXMuX3BvcHVwSW1hZ2UuYWx0ID0gbmFtZTtcclxuICAgIHRoaXMuX3BvcHVwVGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgc3VwZXIub3BlbigpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoSW1hZ2U7XHJcbiIsImNsYXNzIFNlY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHsgZGF0YSwgcmVuZGVyZXIgfSwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLl9pdGVtcyA9IGRhdGE7XHJcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgdGhpcy5fY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRJdGVtKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcclxuIiwiY2xhc3MgVXNlckluZm8ge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWVTZWxlY3Rvciwgam9iU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX25hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5hbWVTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9qb2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGpvYlNlbGVjdG9yKTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCkge1xyXG4gICAgcmV0dXJuIHsgbmFtZTogdGhpcy5fbmFtZS50ZXh0Q29udGVudCwgam9iOiB0aGlzLl9qb2IudGV4dENvbnRlbnQgfTtcclxuICB9XHJcblxyXG4gIHNldFVzZXJJbmZvKHsgbmFtZSwgam9iIH0pIHtcclxuICAgIHRoaXMuX25hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgdGhpcy5fam9iLnRleHRDb250ZW50ID0gam9iO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXNlckluZm87XHJcbiJdLCJuYW1lcyI6WyJjb25zdHJ1Y3RvciIsImRhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwidGhpcyIsIl9uYW1lIiwibmFtZSIsIl9saW5rIiwibGluayIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlSW1hZ2VDbGljayIsIl9zZXRFdmVudExpc3RlbmVycyIsIl9jYXJkSW1hZ2VFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9saWtlSWNvbiIsIl9oYW5kbGVMaWtlSWNvbiIsIl90cmFzaEljb24iLCJfaGFuZGxlRGVsZXRlQ2FyZCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIl9jYXJkRWxlbWVudCIsInJlbW92ZSIsIl9nZXRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJnZXRWaWV3IiwiX2VsIiwiX2NhcmRUaXRsZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInNyYyIsImFsdCIsInNldHRpbmdzIiwiZm9ybUVsIiwiX2Zvcm1TZWxlY3RvciIsImZvcm1TZWxlY3RvciIsIl9pbnB1dFNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsIl9zdWJtaXRCdXR0b25TZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiX2luYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiX2lucHV0RXJyb3JDbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsIl9lcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsIl9mb3JtRWwiLCJfaW5wdXRMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsIl9zdWJtaXRCdXR0b24iLCJmb3JFYWNoIiwiaW5wdXRFbCIsIl9pbnB1dEVsIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsIl9zaG93SW5wdXRFcnJvciIsIl9lcnJvck1lc3NhZ2VFbCIsImlkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJhZGQiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX2hpZGVJbnB1dEVycm9yIiwiX2hhc0ludmFsaWRJbnB1dCIsIl9lbmFibGVCdXR0b24iLCJfZGlzYWJsZUJ1dHRvbiIsImV2ZXJ5IiwiZGlzYWJsZWQiLCJlbmFibGVWYWxpZGF0aW9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwicmVzZXRWYWxpZGF0aW9uIiwiX3JlZiIsInBvcHVwU2VsZWN0b3IiLCJfbW9kYWxFbCIsIm9wZW4iLCJfaGFuZGxlRXNjIiwiY2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwia2V5Iiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwIiwiaGFuZGxlRm9ybVN1Ym1pdCIsInN1cGVyIiwiX3BvcHVwRm9ybSIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX2xpc3QiLCJyZXNldCIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0RGF0YSIsImlucHV0IiwidmFsdWUiLCJwcm9maWxlRWRpdEJ1dHRvbiIsInByb2ZpbGVOYW1lSW5wdXQiLCJwcm9maWxlSm9iSW5wdXQiLCJjYXJkQWRkQnV0dG9uIiwiY2FyZExpc3RFbGVtZW50IiwiZm9ybVZhbGlkYXRvcnMiLCJjb25maWciLCJBcnJheSIsImZyb20iLCJmb3JtRWxlbWVudCIsInZhbGlkYXRvciIsIkZvcm1WYWxpZGF0b3IiLCJmb3JtTmFtZSIsImdldEF0dHJpYnV0ZSIsImNyZWF0ZUNhcmQiLCJjYXJkSXRlbSIsIkNhcmQiLCJjb25zb2xlIiwibG9nIiwiaW1nUG9wdXAiLCJfcG9wdXBJbWFnZSIsIl9wb3B1cFRpdGxlIiwiY2FyZFNlY3Rpb24iLCJjb250YWluZXIiLCJyZW5kZXJlciIsIl9pdGVtcyIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJyZW5kZXJJdGVtcyIsIml0ZW0iLCJhZGRJdGVtIiwiZWxlbWVudCIsInByZXBlbmQiLCJjYXJkRWxlbWVudCIsInVzZXJJbmZvIiwibmFtZVNlbGVjdG9yIiwiam9iU2VsZWN0b3IiLCJfam9iIiwiZ2V0VXNlckluZm8iLCJqb2IiLCJzZXRVc2VySW5mbyIsInByb2ZpbGVQb3B1cCIsIlBvcHVwV2l0aEZvcm0iLCJuZXdDYXJkUG9wdXAiLCJjYXJkRm9ybUVsZW1lbnQiXSwic291cmNlUm9vdCI6IiJ9