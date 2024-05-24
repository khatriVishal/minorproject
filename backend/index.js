

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const {v4 : uuidv4} = require('uuid')
let imagename;
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'university',
  password : '1234'
});
// function aaadata(){
 
//   // console.log(sql);
//   for(let i = 0 ; i<data.length ; i++)
//   {
//     const sql = `insert into student (Rollno , name,branch,semester,password,Degree) values ('${data[i].rollno}' , '${data[i].name}', '${data[i].branch}','${data[i].semester}','${data[i].password}','${data[i].rollno}')`; 
//     db.query(sql , (err , data)=>{
//       if(err) console.log(err);
//     })
//   }


// }
// aaadata();
const port = 8000;
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let users = ['{"name":"John", "age":30, "city":"New York"}'];
app.get("/api/users" , (req , res)=>{
res.send(users);

})

app.get("/" ,(req , res)=>{
res.send("server is running");

})
app.post("/login" , (req , res)=>{
    console.log("yes");
    const sql = `select * from student where Rollno = "${req.body.rollno}" and password = "${req.body.password}"`;
    console.log(req.body.rollno);
   console.log(req.body.password);
    console.log(sql);
    db.query(sql ,  (err , data)=>{
        console.log(sql);
        console.log(data);
        // console.log(res.json(data));
        if(err || data.length<=0) res.status("404").send("user not found");
        else {
        const userData = {
          userId: data[0].Rollno,
          userName: data[0].name,
          photo : data[0].photo,
          year : data[0].year,
          branch : data[0].branch,
          semester : data[0].semester
          // Add other user data as needed
        };
        console.log(err);
        console.log(data.length);
       
        console.log("Login successful");
        res.json({ userData});}
    })
}) 
app.post("/loginn" , (req , res)=>{
  console.log("yes");
  const sql = `select * from teacher where Tid = "${req.body.rollno}" and password = "${req.body.password}"`;
  console.log(req.body.rollno);
 console.log(req.body.password);
  console.log(sql);
  db.query(sql ,  (err , data)=>{
      console.log(sql);
      console.log(data);
      // console.log(res.json(data));
      if(err || data.length<=0) res.status("404").send("user not found");
      else {
      const userData = {
        userId: data[0].Tid,
        userName: data[0].name,
        photo : data[0].photo,
        dept : data[0].department,
        
        // Add other user data as needed
      };
      console.log(err);
      console.log(data.length);
     
      console.log("Login successful");
      res.json({ userData});}
  })
}) 
app.use("/uploads", express.static("./uploads"));
const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    // const { textData } = req.body;
    // console.log(textData+"u")
    cb(null, './uploads');
  },
  filename:function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    imagename = "image" + '-' + uniqueSuffix+".jpg";
    cb(null, "image" + '-' + uniqueSuffix+".jpg");
  }
});
const upload = multer({ storage });
app.post('/upload',  upload.single('image' ),(req, res) => {
  console.log(req.body);
  const sql = `UPDATE student SET photo = "${imagename}" where   Rollno= "${req.body.rollno}" and name = "${req.body.name}"`;
  console.log(sql);
  const { textData } = req.body;
  const file = req.file;
 db.query(sql , (err , data)=>{
  if(err) res.send(err);
  else 
  {
    console.log("yes");
    res.send(imagename);
  }
 })  
  

  
});
// create subject 
app.post('/createsubject',  (req, res) => {
  console.log("yes");
  const body = req.body;
  console.log(req.body);
  const newId = uuidv4();
  const sql = `INSERT INTO subjects (subject_id, subject_name,associated_teacher, branch, semester, Degree,id) VALUES ('${body.subjectcode}', '${body.subjectname}', '${body.tid}', '${body.branch}', '${body.Semester}', '${body.degree}','${newId}');`;
  console.log(sql);
  db.query(sql , (err1 , data1)=>{
    if(err1){console.log(err1); res.status("404").send("user not found");}
    else 
    {
      const sql2 = `select * from student where branch = '${body.branch}' and semester = '${body.Semester}'and Degree = '${body.degree}'`;
     console.log(sql2);
      db.query(sql2 , (err2 , data2)=>{
        console.log(data2);
       if(err2) console.log(err2);
       else 
       {
        const student_data = data2;
        console.log(student_data.length);
        for(let i = 0 ; i<student_data.length ; i++)
        {
          const sql3 = 
          `INSERT INTO attendance (subject_id, subject_name,student_name ,Rollno, photo, tot_attendace,mark_attendance, branch ,semester, Degree , id) VALUES ('${body.subjectcode}', '${body.subjectname}', '${student_data[i].name}', '${student_data[i].Rollno}','${student_data[i].photo}' , '0' ,'0', '${student_data[i].branch}', '${student_data[i].semester}', '${student_data[i].Degree}', '${newId}')`;
          console.log(sql3 , "sql3");
          console.log(sql3);
          db.query(sql3 , (err3 , data3)=>{
           if(err3) 
           res.send(err3);
          


          })
        }

        res.json({ message:'succesfully created subject' });
       }


      })
      
    }
   })  

  
});
app.post("/attendance" ,(req , res)=>{
  console.log("yesattttt");
  console.log(req.body);
  const sql = `select * from subjects where associated_teacher = '${req.body.Tid}'`;
  // console.log(sql);
  db.query(sql , (err , data)=>{
    // console.log(err);
    if(err) {console.log("yessssss");console.log(err);res.send("Some error happened try again");}
    else {console.log(data);res.send(data);}
  })

  });
  app.post("/editsubject",(req , res)=>{
    console.log(req.body);
    const sql = `UPDATE subjects set subject_id = '${req.body.subjectcode}',subject_name ='${req.body.subjectname}' ,Degree = '${req.body.degree}',semester = '${req.body.Semester}', branch = '${req.body.branch}' where id = '${req.body.id}'`;
    db.query(sql , (err , data)=>{
      if(err) res.send(err);
      else res.send("succesfully edited");
    })
  })
  app.post("/deletesubject",(req , res)=>{
    const sql = `delete from subjects where id ='${req.body.id}'`;
    console.log(sql);
    db.query(sql , (err1 , data1)=>{
      if(err1)
     {
      res.send(err1);
     }
      else {
        const sql2 = `delete from attendance where id ='${req.body.id}'`;
        console.log(sql2);
        db.query(sql2 , (err2 , data2)=>
        {
          if(err2) res.send(err2);
          else {
            res.send("deleted");
          }
        });
      }
    })
    console.log(req.body);
  
  }
   )
   app.post("/takeattendance" , (req , res)=>{
    console.log("yessssssssss");
    console.log(req.body);
    const sql = `select * from attendance where id = '${req.body.subjectid}'`;
    let resposedata = [];
    db.query(sql , (err , data)=>{
    if(err) console.log(err);
    else {
    res.send(data);
    
    }

    })
    console.log(sql);
   })
   app.post("/updateattendance" , (req , res)=>{
    console.log(req.body);
    let recieved_data = req.body.newdatatodisplay;
    console.log("recieved");
    for(let i = 0 ; i<recieved_data.length ; i++)
    {
    
      // console.log("yesss");
      console.log(recieved_data[i].present);
      if(recieved_data[i].present === true)
      {
         const sql = `update attendance  set tot_attendace = tot_attendace+1 , mark_attendance = mark_attendance+1 where id = '${recieved_data[i].id}' and Rollno = '${recieved_data[i].rollno}'`;
          // console.log(sql);
         db.query(sql , (err , data)=>{
          if(err)
          {
            console.log(err);
           res.send(err);
          }
          else 
          {
            const sql2 = `insert into viewattendance ( student_name, photo, attendance, id, Rollno, att_date)
             values ('${recieved_data[i].name}' , '${recieved_data[i].image}' , 'present' , '${recieved_data[i].id}', '${recieved_data[i].rollno}', CURRENT_DATE)
            `;
            db.query(sql2 , (err2 , data)=>{
              if(err2)
              {
                console.log(err2);
                res.send(err2);
              }
              
            })
            // console.log(sql2);
          }
         });
          
      }
      else 
      {
        const sql = `update attendance  set tot_attendace = tot_attendace+1 where id = '${recieved_data[i].id}' and Rollno = '${recieved_data[i].rollno}'`;
        console.log("NOOOO");
        db.query(sql , (err , data)=>{
          if(err)
          {
            console.log(err);
            console.log("yessssssss");
          }
          else 
          {
            const sql2 = `insert into viewattendance ( student_name, photo, attendance, id, Rollno, att_date)
             values ('${recieved_data[i].name}' , '${recieved_data[i].image}' , 'absent' , '${recieved_data[i].id}', '${recieved_data[i].rollno}', CURRENT_DATE)
            `;
            db.query(sql2 , (err2 , data)=>{
              if(err2)
              {
                console.log(err2);
                res.send(err2);
              }

              });
          }
         });
      }
    }
    res.json("succesfully created subject");
   });
   app.post("/getdate" , (req , res)=>{
    console.log("received");
    console.log(req.body);
    const sql =` select distinct att_date from viewattendance where id = '${req.body.newdata[0].id}'`;
    db.query(sql , (err , data)=>{
      if(err) res.send(err);
      else {
        let newdate = [];
        for(let i = 0 ; i<data.length ; i++){
        const dateString = data[i].att_date;
        const moment = require('moment-timezone');
  
        // const dateString = '2024-04-13T18:30:00.000Z';
        const ISTDateString = moment(dateString).tz('Asia/Kolkata').format('YYYY-MM-DD');
        newdate.push(ISTDateString);
        }
        // console.log(ISTDateString); 
        
        
        
        res.send(newdate);}
     
      
    })
    console.log(sql);
   })
   app.post("/viewattendance" , (req , res)=>{
    console.log(req.body);
    console.log("request accepted");
    const sql = `select student_name, Rollno, attendance  from viewattendance where att_date = '${req.body.selectedDate}' and id = '${req.body.id}'`;
    db.query(sql , (err , data)=>{
      if(err)
      res.send(err);
     else 
    { res.send(data);}
    })
    console.log(sql);
   })
app.listen(port , ()=>{
    console.log(`working on ${port}`);
})