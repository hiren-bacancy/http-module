//FOR EXPLANATION ---> END
const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
            res.end(`
                <html>
                    <head>
                        <style>
						  table, th, td {
  										border: 1px solid black;
  										border-collapse: collapse;
									    padding: 15px;
									    width:50%;
									    background-color: #f1f1c1;
									    text-align: left;
						  }
					   </style>
                    </head>
            		<body>
                        <table>
            			<tr>
            		 		<td>name</td>
            		 		<td>password</td>
            		 		<td>email</td>
            		 		<td>address</td>
            		 		<td>zipcode</td>
            		 		<td>pno</td>
            		 		<td>mno</td>
            		 	</tr>
            		 	<tr>
            		 		<td>${result.uname}</td>
            		 		<td>${result.password}</td>
            		 		<td>${result.email}</td>
            		 		<td>${result.address}</td>
            		 		<td>${result.zipcode}</td>
            		 		<td>${result.pno}</td>
            		 		<td>${result.mno}</td>
            		 	</tr>
            		    </table>
                    </body>
                </html>
            `);
        });
    } 
    else {
        
        if(req.url=='/Sign'){
            res.end(`
                <!DOCTYPE html>
                <html lang=>
                    <head>
                        <title>Sign Up</title>
                        <style>
                        * {
                            box-sizing: border-box;
                        }

                        .container{
                            position: relative;
                            border: 2px solid lightblue;
                            width: 100%;
                            background-color:rgb(224, 234, 243);
                        }
                        h3{
                            color: black;
                            padding: 10px;
                        }

                        input{
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            padding: 10px;
                            margin: 3%;
                            width: 40%;
                        }
                        input[size="4"]{
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            padding: 10px;
                            margin: 2%;
                            width: 15%;
                        }
                        label.lb1{
                            margin-left: 2.8%;
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        }
                        button.btn{
                            border: 1px solid #ccc;
                            background-color: lightblue;
                            border-radius: 10px;
                            padding: 10px;
                            margin: 2em;
                        }
                        button:hover{
                            background-color:aqua; 
                        }

                        @media (max-width: 335px) {
                        
                            .container{
                                background-color: lightgreen;
                                border: 2px solid lightcoral;
                                width: auto;
                            }
                            input{
                                margin-left: 5%;
                                width: auto;
                                padding : 10px;
                            }
                            input[size="4"]{
                                border: 1px solid #ccc;
                                border-radius: 4px;
                                padding: 10px;
                                margin: 2%;
                                width: 49%;
                            }

                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <h3>Sign Up</h3>
                        <form method='POST' action='/'>
                            <input type="text" name="uname" placeholder="User Name">
                            <input type="password" name="password" placeholder="Password">
                            <input type="email" name="email" placeholder="Email">
                            <input type="email" name="cemail" placeholder="confirm Email">
                            <input type="text" name="address" placeholder="Address">
                            <input type="text" name="zipcode" placeholder="Zipcode">
                            <input type="text" name="pno" placeholder="Phone Number">
                            <input type="text" name="mno" placeholder="Mobile Number">
                            <label class="lb1">Verification</label><input type="text" class="vari" name="verification" maxlength="4" placeholder="OTP" size="4">
                            <button class="btn">SIGN-IN NOW</button>
                        </form>
                        </div>
                    </body>
                </html>
            `);
        }else{
            console.log(req.url)
            res.end(`
                <html>
                    <head>
                        <title>WELCOME</title>
                    </head>
                    <body>
                        <center>
                        <form action='/Sign' method='GET'>
                            <button class="btn">WELCOM</button>
                        </form>
                        </center>
                    </body>
                </html>
            `);
        }
    }
});
server.listen(3000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}




   // FLOW OF APPLICATION:::::<<<<-----
   // 1.RUNS SERVER ON PORT NO.3000
   // 2.if  (check---->  req.method = 'POST') (FALSE)
   // 3.else(
   //         if(req.url == '/Sign')  (FALSE)
   //         else( .res.end() ----->  render welcome.html)         <-----(WELCOME)
   // 4.OnSubmit(GET)---->  URL == /Sign (load server with new URL)
   //          STEP-2 (Again FALSE)
   // 5.else(
   //         if(req.url == '/Sign')  (TRUE)
   //             {.res.end() ----->  render form.html}            <-----(FORM)
   // 6.OnSubmit(POST) ----> (load server with new URL)
   //            STEP-2 (TRUE)                                     <-----(FORM DATA)
   // 7.Call function named collectRequestData(req,callback) ----->this function takes data from URL and convert it to JSON
   // 8.render new html with formdata on res.end()