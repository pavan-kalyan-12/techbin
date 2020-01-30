import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

//import{FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database-deprecated';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor(private db: AngularFireDatabase,
    private router: Router, private afAuth: AngularFireAuth, private af: AngularFirestore, public as: AuthService, public zone: NgZone) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user.uid;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

  }

  //public readonly ref = firebase.database().ref();

  doGoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        console.log(res);
        let r = res.user.uid;
        var docref = this.af.collection('UID').doc(r);
        docref.get().subscribe(doc => {
          if (doc.exists) {
            this.af.collection("UID").doc(r).update({
              name: res.user.email,
              arr: firebase.firestore.FieldValue.arrayUnion(this.getRandomSpan())
            })
            console.log('Yes');
          }
          else {
            this.af.collection("UID").doc(r).set({
              name: res.user.email,
              arr: firebase.firestore.FieldValue.arrayUnion(this.getRandomSpan())
            })
            console.log('No');
          }
        })
       this.router.navigate(['/login',r]);
      })

  }


  getUsers() {
    return this.af.collection('users').snapshotChanges();
  }



  getRandomSpan() {
    return Math.floor((Math.random() * 6) + 1);
  }

  anonymousLogin() {
    this.zone.run(() => {
      this.afAuth.auth.signInAnonymously().then(user => {
        if (!localStorage.getItem(user.user.uid) ==null) {
            localStorage.setItem('user', user.user.uid);
            this.af.collection("UID").doc(user.user.uid).set({
              uid: user.user.uid,
              arr: firebase.firestore.FieldValue.arrayUnion(this.getRandomSpan()),
          })
        }
          else{
            this.af.collection("UID").doc(user.user.uid).set({
              uid: user.user.uid,
              arr: firebase.firestore.FieldValue.arrayUnion(this.getRandomSpan()),
            },{merge : true})
          }
        
      })
    })

  }

  linkaccount(){
    var provider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth.currentUser.linkWithPopup(provider).then(function(result) {
          // Accounts successfully linked.
          var credential = result.credential;
          var user = result.user;
          console.log("linked successfully");
          console.log(credential + " "+ user);
        }).catch(function(error) {
              console.log("account already exists ");
         });
      }


  loggedOut() {
    return new Promise<any>((resolve, reject) => {
      return firebase.auth().signOut().then(function () {
        localStorage.removeItem('user');
        this.router.navigate(['/register']);
        console.log("Successfully Log Out");
      }).catch(function (error) {
        console.log("Error occured");
      });
    })
  }


}
