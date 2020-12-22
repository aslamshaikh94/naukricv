export const getDateFormat = (fdate, formate)=>{
	let d = new Date(fdate)
	let date = d.getDate()<10? '0'+d.getDate() :d.getDate()
	let month = d.getMonth()+1<10? '0'+(d.getMonth()+1) : d.getMonth()+1
	let year = d.getFullYear()
	if(formate==='yyyy') return year;
	if(formate==='ddmmyyyy') return `${date}/${month}/${year}`;		
}