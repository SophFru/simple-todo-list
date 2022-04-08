//   Global Variables   //

checkBox = '<input type="checkbox" class="chkbx">';
itemTextDiv = '<div class="item-text"></div>';
confirmButton = '<button class="confirm-new-item">✔️</button>';
textBox = '<input class="txt-box">';
editTextBox = '<input class="txt-box edit-txt-box">';
var list = {
    length: 0, 
    next: 0,
    inEditMode : false,
    items: new Array(),
    reset: function() {
        this.length = 0;
        this.next = 0;
        this.inEditMode = false;
        this.items = new Array();
    }
};

//   Nav Buttons    //

//Adds a textbox for the user to type their to-do
$('#new-item').click(function() {
    $('.list').append('<div class="new-item-txtbx" id="item-'+ list.next +'"><div>');
    $('#item-' + list.next).html(confirmButton + textBox).hide();
    $('#item-' + list.next).fadeIn(275, 'swing');
    list.length++; 
    list.next++;
    list.items.push("");
});

//Removes items if their checkbox is checked
$('#remove-completed').click(function() {
    $('.list input').each(function() {
        if(this.checked) {
            parentDivID = $(this).parent().attr('id');
            $('#' + parentDivID).slideUp(300, 'swing', function(){
                $('#' + parentDivID).remove();
            });
            list.length--;
        }
    });
})

//Removes all items, regardless if they are checked.
$('#clear-all').click(function() {
    list.reset();
    $('.list').fadeOut(300, 'swing', function(){
        $('.list').html('');
        $('.list').show();
    });
});

//Temporarily disables nav buttons and new items and allows existing items to be edited
$('nav').on('click', '.edit-mode', function() {
    list.inEditMode = (!list.inEditMode);
    if(list.inEditMode){
        $('.list-item > .edit-txt-box').each(function(){
            parentDivID = $(this).parent().attr('id');
            itemTextIndex = parentDivID.split('-')[1];
            itemText = list.items[itemTextIndex];
            $(this).val(itemText);
        })
    } else {
        $('.list-item > .item-text').each(function(){
            parentDivID = $(this).parent().attr('id');
            itemTextIndex = parentDivID.split('-')[1];
            list.items[itemTextIndex] = $('#' + parentDivID + '> .edit-txt-box').val();
            $(this).text(list.items[itemTextIndex]);
        })
        $('.list input').each(function() {
            if(this.checked) {
                parentDivID = $(this).parent().attr('id');
                $('#' + parentDivID + '> div').html('<del>' + tempText + '</del');
            }
        });
    }
    $('.button-container').toggle();
    $('#finish-edit').toggle();
    $('.chkbx').toggle();
    $('.item-text').toggle();
    $('.edit-txt-box').toggle();
    $('.new-item-txtbx').toggle();
});

//   List Buttons/Checkboxes   //

//Confirm new item
//takes the text from the input box and turns it into a list item
$('.list').on('click', '.confirm-new-item', function() {
    parentDivID = $(this).parent().attr('id');
    itemIndex = parentDivID.split('-')[1];
    itemText = $('#' + parentDivID + '> input').val();
    list.items[itemIndex] = itemText;
    $('#' + parentDivID).removeClass('new-item-txtbx').addClass('list-item');
    $('#' + parentDivID).html(checkBox + itemTextDiv + editTextBox);
    $('#' + parentDivID + '> .item-text').html(itemText);
    $('#' + parentDivID + '> .edit-txt-box').hide();
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
});