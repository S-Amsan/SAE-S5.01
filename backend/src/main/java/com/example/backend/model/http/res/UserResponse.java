package com.example.backend.model.http.res;

 import com.example.backend.model.User;
 import lombok.Data;

 @Data
 public class UserResponse {

     private Long id;
     private String email;
     private String pseudo;
     private String phone;
     private String photoProfile;
     private boolean actif;
     private String name;

     public UserResponse() {}

     public UserResponse(User user) {
         this.id = user.getId();
         this.email = user.getEmail();
         this.pseudo = user.getPseudo();
         this.phone = user.getPhone();
         this.photoProfile = user.getPhotoProfile();
         this.actif = user.isActif();
         this.name = user.getName();
     }
 }
