$(function()
{
	$.ajax({
		method:'GET',
		url:'api/videos',
		success: function(videos){
			$.each(videos,function(i,video){
				$('#videolist').append('<li>'+
					'<img style="width:200px;height: 200px;" src="../images/'
					+video._id+'.jpg"><br>'+video.title+'</li>');
			});
		},
		error: function()
		{
			alert("error loading videos");
		}
	});
	$('#add').click(function()
	{
		var vtitle = $('#title').val();
		var vgenre = $('#genre').val();
		var vdesc = $('#desc').val();
		var video = {
			title:vtitle,
			genre:vgenre,
			desc:vdesc
		}
		$.ajax({
			method:'POST',
			url:'api/videos',
			data:video,
			success:function(newVideo){
				$('#videolist').append('<li>'+
					'<img style="width:200px;height: 200px;" src="../images/'
					+video._id+'.jpg"><br>'+video.title+'</li>');
			},
			error:function(){
				alert("error saving video");
			}
		})
	});
});