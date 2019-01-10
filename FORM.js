const http = require('http');
const { parse } = require('querystring');

let server = http.createServer((req,res)=>{
	if (req.method === 'POST') {
		(function collectData(){
			let body='';
			req.on('data', chunk => {
				body+=chunk.toString();
			});
			req.on('end',()=>{
				console.log(parse(body));
				body = parse(body);
				res.end(`
					<center>
						<table>
							<tr>
								<td>Name</td>
								<td>Email</td>
							</tr>
							<tr>
								<td>${body.name}</td>
								<td>${body.email}</td>
							</tr>
						</table>
					</center>
				`);
			});
		})();
	}else{ 
		if (req.url == '/sign') {
			res.end(`
				<center>
					<form method='POST' action='#'>
						<input type='text' name='name' placeholder='Name'>
						<input type='email' name='email' placeholder='Email'>
						<button>Sign In</button>
					</form>
				</center>
			`);
		}else{
			res.end(`
				<center>
					<form method='GET' action='/sign'>
						<button>WELCOM</button>
					</form>
				</center>
			`);
		}
	}
})


server.listen(3000);