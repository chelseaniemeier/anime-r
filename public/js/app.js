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


  // These functions set up the Add Anime button/form 

  function handleAddFileClick() {
    console.log("There are too many animes to watch...");
    setFormData({});
    toggleAddFileFormVisibility();
  }

  function toggleAddFileFormVisibility() {
    $('#form-container').toggleClass('hidden');
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
        toggleAddFileFormVisibility();
      })
      .fail(function(error) {
        console.log("Oops, we failed at posting your anime!", error);
      })
  
    console.log("Your anime data", fileData);
  }
  
  function cancelFileForm() {
    toggleAddFileFormVisibility();
  }

// Finds and edits file

  function handleEditFileClick(id) {
    const file = window.fileList.find(file => file._id === id);
    if (file) {
      setFormData(file);
      toggleAddFileFormVisibility();
    }
  }

// "Deletes" the specified file. It's a soft delete, so the data could be recovered.


  function handleDeleteFileClick(id) {
    if (confirm("Are you sure you want to remove this anime? What did this anime ever do to you?")) {
      deleteFile(id);
    }
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