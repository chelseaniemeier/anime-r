// These functions compile the data from the mlab database and then displays the data collection in the list-container div in the html

function getFiles() {
    return $.ajax('/api/file')
      .then(res => {
        console.log("Results from getFiles()", res);
        return res;
      })
      .fail(err => {
        console.log("Error in getFiles()", err);
        throw err;
      });
}

function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getFiles()
    .then(files => {

      window.fileList = files;

      const data = {files: files};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}

// Collecting user input data from the add/edit anime form

function setFormData(data) {
  data = data || {};

  const file = {
    image: data.image || '',
    title: data.title || '',
    description: data.description || '',
    rating: data.rating || '',
    _id: data._id || '',
  };

  $('#file-image').val(file.image);
  $('#file-title').val(file.title);
  $('#file-description').val(file.description);
  $('#file-rating').val(file.rating);
  $('#file-id').val(file._id);
}

// Sticky navigation
$(document).ready(function() {
  // grab the initial top offset of the navigation 
  var stickyNavTop = $('.navigation').offset().top;
    
  // function that decides weather the navigation bar should have "fixed" css position or not.
  var stickyNav = function(){
  var scrollTop = $(window).scrollTop(); // our current vertical position from the top
          
  // if we've scrolled more than the navigation, change its position to fixed to stick to top,
  // otherwise change it back to relative
    if (scrollTop > stickyNavTop) { 
        $('.navigation').addClass('sticky');
    } else {
        $('.navigation').removeClass('sticky'); 
    }
  };

  stickyNav();
  // and run it again every time you scroll
  $(window).scroll(function() {
    stickyNav();
  });
});


// These functions set up the Add Anime button/form 

function handleAddFileClick() {
    console.log("There are too many animes to watch...");

    showAddFileForm({});
}

function showAddFileForm(file) {
  var title = file._id ? "Edit Anime" : "Add Anime";
  var content = `
  <div id="form-container">

  <form id="add-file-form">

      <input type="hidden" id="file-id" value="" />

      <div class="form-group">
          <label for="file-image">Anime Picture</label>
          <input type="text" class="form-control" id="file-image" placeholder="Image Url">
      </div>

      <div class="form-group">
        <label for="file-title">Anime Title</label>
        <input type="text" class="form-control" id="file-title" placeholder="Title">
      </div>

      <div class="form-group">
        <label for="file-description">Short Description</label>
        <textarea class="form-control" rows="5><input type="text" class="form-control" id="file-description" placeholder="Description"></textarea>
      </div>

      <div class="form-group">
        <label for="file-rating">Anime Rating</label>
        <input type="text" class="form-control" id="file-rating" placeholder="Rating">
      </div>
      
  </form>

</div>
`;

console.log(content);
  $.confirm({
    title: title,

    content: content,
    buttons: {
        formSubmit: {
            text: 'Submit',
            btnClass: 'btn-blue',
            action: submitFileForm
        },
        cancel: function () {
            //close
        },
    },
    onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
            // if the user submits the form by pressing enter in the field.
            e.preventDefault();
            jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
        setFormData(file);
    }
});
}

function submitFileForm() {
  console.log("Thanks for the recommendation!");

  const fileData = {
    image: $('#file-image').val(),
    title: $('#file-title').val(),
    description: $('#file-description').val(),
    rating: $('#file-rating').val(),
    _id: $('#file-id').val(),
  };

// If there is a file already in existance, it will update the information. If there isn't an existing file/id in the data, the form will post/add a new anime    
  let method, url;
  if (fileData._id) {
    method = 'PUT';
    url = '/api/file/' + fileData._id;
  } else {
    method = 'POST';
    url = '/api/file';
  }

  $.ajax({
    type: method,
    url: url,
    data: JSON.stringify(fileData),
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("We have posted the anime");
      refreshFileList();
    })
    .fail(function(error) {
      console.log("Oops, we failed at posting your anime!", error);
    })

  console.log("Your anime data", fileData);
}
  

// Finds and edits file

function handleEditFileClick(id) {
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    // setFormData(file);
    showAddFileForm(file);
  }
}

// "Deletes" the specified file. It's a soft delete, so the data could be recovered.

function handleDeleteFileClick(id) {
  $.confirm({
    title: 'Wait!',
    content: 'Are you SURE you want to delete this anime?',
    buttons: {
        confirm: function () {
          deleteFile(id)
        },
        cancel: function () {
            $.alert('Canceled!');
        }
    },
    theme: 'supervan',
  });
}


function deleteFile(id) {
  $.ajax({
    type: 'DELETE',
    url: '/api/file/' + id,
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("File", id, "is kicked off the island.");
      refreshFileList();
    })
    .fail(function(error) {
      console.log("Not forgotten yet!", error);
    })
}


refreshFileList();