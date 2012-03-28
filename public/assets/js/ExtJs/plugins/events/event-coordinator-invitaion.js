var win;
function showContactForm() {
        if (!win) {
            var form = Ext.widget('form', {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,

                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },
                defaults: {
                    margins: '0 0 10 0'
                },

                items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Co Ordinator Name',
                    labelStyle: 'font-weight:bold;padding:0',
                    layout: 'hbox',
                    defaultType: 'textfield',

                    fieldDefaults: {
                        labelAlign: 'top'
                    },

                    items: [{
                        flex: 1,
                        name: 'first_name',
                        fieldLabel: 'First Name',
                        allowBlank: false
                    }, {
                        flex: 2,
                        name: 'last_name',
                        fieldLabel: 'Last Name',
                        allowBlank: false,
                        margins: '0 0 0 5'
                    }]
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Co Ordinator Email Address',
                    name: 'email',
                    vtype: 'email',
                    allowBlank: false
                }, {
                    xtype: 'textareafield',
                    name: 'message',
                    fieldLabel: 'Message',
                    labelAlign: 'top',
                    flex: 1,
                    margins: '0',
                    allowBlank: false
                }],

                buttons: [{
                    text: 'Cancel',
                    handler: function() {
                        this.up('form').getForm().reset();
                        this.up('window').hide();
                    }
                }, {
                    text: 'Send',
                    handler: function() {
                        if (this.up('form').getForm().isValid()) {
                            form.submit({
                                clientValidation: true,
                                url: '/admin/events/sendinvitation',
                                success: function(form, action) {                                    
                                   //form.getForm().reset();
                                   //window.hide();
                                   Ext.MessageBox.alert('Thank you!', 'Your mail has been sent.');
                                },
                                failure: function(form, action) {
                                   //this.up('form').getForm().reset();
                                   //this.up('window').hide();
                                   Ext.MessageBox.alert('Thank you!', 'Your mail has not been sent.');
                                }
                            });

                            
                            
                            // In a real application, this would submit the form to the configured url
                            // this.up('form').getForm().submit();
                            
                            /**
 * Ext.Ajax.request({
 *                 				url: '/admin/events/sendinvitation',
 *                 				method: 'POST',
 *                 				params: ' first_name = ' + Ext.getCmp('first_name').getValue()
 * ,
 *                 				success: function(o) {
 *                 					if (o.responseText == 0) {
 *                 						this.up('form').getForm().reset();
 *                                         this.up('window').hide();
 *                                         Ext.MessageBox.alert('Thank you!', 'Your mail has been sent.');
 *                 					} else {
 *                 						this.up('form').getForm().reset();
 *                                         this.up('window').hide();
 *                                         //Ext.MessageBox.alert('Thank you!', 'Your mail has been sent.');
 *                 					}
 *                 				}
 *                 			});
 */
                            
                           // alert(this.up('form').getForm().getValues());
                            
                            
                           
                             //var first_name = Ext.getCmp('first_name').getValue();
                                                        
                            
                            /*
                             Ext.Ajax.request({
                                                             url: '/admin/events/sendinvitation',
                                                             params: {
                                                                 id: this.getValues()
                                                             },
                                                             success: function(response){
                                                                 var text = response.responseText;
                                                                 // process server response here
                                                             }
                                                         });
                             */
                            
                            
                        }
                    }
                }]
            });

            win = Ext.widget('window', {
                title: 'Invite Event Co ordinator',
                closeAction: 'hide',
                width: 400,
                height: 400,
                minHeight: 400,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: form
            });
        }
        win.show();
    }