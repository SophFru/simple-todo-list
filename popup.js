var list = {length: 0, next: 1};

//   Nav Buttons    //

//Adds a textbox for the user to type their to-do
$('#new-item').click(function() {
    $('.list').append('<div class="new-item-txtbx" id="item-'+ list.next +'"><div>');
    $('#item-' + list.next).html('<button class="confirm-new-item">✔️</button><input class="txt-box">')
    list.length++; 
    list.next++;
});

//Removes items if their checkbox is checked
$('#remove-completed').click(function() {
    $('.list input').each(function() {
        if(this.checked) {
            parentDivID = $(this).parent().attr('id');
            $('#' + parentDivID).remove();
            list.length--;
        }
    });
})

//Removes all items, regardless if they are checked.
$('#clear-all').click(function() {
    list.length = 0;
    list.nextitem = 1;
    $('.list').html('');
});

//   List Buttons/Checkboxes   //
// List items are added dynamically, so event delegation is needed

//Confirm new item
//takes the text from the input box and turns it into a list item
$('.list').on('click', '.confirm-new-item', function() {
    parentDivID = $(this).parent().attr('id');
    itemText = $('#' + parentDivID + '> input').val();
    $('#' + parentDivID).removeClass('new-item-txtbx').addClass('list-item');
    $('#' + parentDivID).html('<input type="checkbox" class="chkbx"><div class="item-text">' + itemText + '</div>');
});

//Mark completed
//strikes through the item text if checked, otherwise removes the strikethrough
$('.list').on('change', '.chkbx', function() {
    parentDivID = $(this).parent().attr('id');
    tempText = $('#' + parentDivID + '> div').text();
    if(this.checked) { 
        $('#' + parentDivID + '> div').html('<del>' + tempText + '</del');
    } else {
        $('#' + parentDivID + '> div').html(tempText);
    }
})