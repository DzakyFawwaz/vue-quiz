// (function () {
//   var pws = document.querySelectorAll('[data-cci]');
  
//   function genInput(id){
//     var _input = document.createElement('input');
//     _input.setAttribute('type','text');
//     _input.style.display = 'none';
//     _input.id = id;
//     return _input;
//   }
  
//   // listen event to password input
//   for(var i = 0; i < pws.length; i++) {
//     var el = pws[i];
//     var ctrl = document.querySelector('[data-cci-control="'+ el.id +'"]')
//     var cci_id = 'cci'+i;
//     var cci = genInput(cci_id);
//     el.dataset.cci = cci_id;
//     ctrl.dataset.cci = cci_id;
//     el.insertAdjacentElement('afterend', cci)
//     el.addEventListener('input', function(e){
//       cc = document.getElementById(e.target.dataset.cci)
//       cc.value = e.target.value;
//     })
//   }

//   // controls
//   var ctrls = document.querySelectorAll('[data-cci-control]');
//   for(var i = 0; i < ctrls.length; i++) {
//       ctrls[i].addEventListener('click', function(e){
//         var pw = document.getElementById(e.target.dataset.cciControl);
//         var cci = document.getElementById(e.target.dataset.cci);

//         if(cci.style.display === 'none'){
//           cci.style.display = 'inline';
//           pw.style.display = 'none';
//         }else{
//           cci.style.display = 'none';
//           pw.style.display = 'inline';
//         }
//       })
//   }
// })()