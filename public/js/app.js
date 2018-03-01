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
        const data = {files: files};
        const html = compiledTemplate(data);
        $('#list-container').html(html);
      })
  }


  function handleAddFileClick() {
    toggleAddFileFormVisibility();
    $('#file-title').val(null);
    $('#file-description').val(null);
  }

  function toggleAddFileFormVisibility() {
    $('#form-container').toggleClass('hidden');
  }

  function submitFileForm() {
    console.log("You clicked 'submit'. Congratulations.");
   
    const fileData = {
      title: $('#file-title').val(),
      description: $('#file-description').val(),
    };

    $.ajax({
        type: "POST",
        url: '/api/file',
        data: JSON.stringify(fileData),
        dataType: 'json',
        contentType : 'application/json',
      })
        .done(function(response) {
          console.log("We have posted the data");
          refreshFileList();
          toggleAddFileFormVisibility();
        })
        .fail(function(error) {
          console.log("Failures at posting, we are", error);
        });
   
   }
  
  function cancelFileForm() {
    toggleAddFileFormVisibility();
  }

  refreshFileList();