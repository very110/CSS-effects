window.addEventListener('load',function(){
			var ik=document.querySelectorAll('.bak')
			var ul=document.querySelector('.gg')
			var li=ul.querySelectorAll('li')
			var aut=document.querySelectorAll('audio')
			var p=0

			for(i=0;i<li.length;i++){
				
				li[i].setAttribute('index',i)
				li[i].addEventListener('mouseenter',function(){
					var index=this.getAttribute('index')
					for(j=0;j<li.length;j++){
						ik[j].style.display='none'
					}
					ik[index].style.display='block'
				})
				li[i].addEventListener('click',function(){
					for(j=0;j<li.length;j++){
						aut[j].pause()
					}
					var index=this.getAttribute('index')
					
					if(p==0){
						aut[index].play()
						ik[index].style.background='url('+'img/Snipaste_2021-12-23_19-34-37.png'+')'+'no-repeat'
						
						ik[index].style.backgroundSize='100% auto'
						p++
					}
					else{
						aut[index].pause()
						ik[index].style.background='url('+'img/cover_play@2x.53a26efb.png'+')'
						ik[index].style.backgroundSize='100% auto'
						p--
					}
					
				})
			}
		  		
})