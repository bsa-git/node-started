//--- Flash template ---//
export const tmplFlashMessage = [
    '<div class="alert alert-<%- type %> alert-dismissible" role="alert">',
    '<button class="close" type="button" data-dismiss="alert" aria-label="Close">',
    '<span aria-hidden="true">×</span>',
    '</button>',
    '<div><strong><%- type.toUpperCase() %></strong></div>',
    '<div class="message-body">',
    '<% messages.forEach(function(msg){ %>',
    '<div><%= msg %></div>',
    '<% }); %>',
    '</div>',
    '</div>'
].join(' ');

//--- Error template ---//
export const tmplErrorMessage = [
    '<div class="alert alert-danger alert-dismissible" role="alert">',
    '<button class="close" type="button" data-dismiss="alert" aria-label="Close">',
    '<span aria-hidden="true">×</span>',
    '</button>',
    '<div><strong>ERROR</strong></div>',
    '<div class="message-body">',
    '<div class="text-center">',
    '<h2><strong><%- error.message %></strong></h2>',
    '<h3>',
    '<% if (error.code) { %>',
    'Code: <%- error.code %>',
    '<% } %>',
    '<% if (error.type) { %>',
    'Type: <%- error.type %>',
    '<% } %>',
    '</h3>',
    '</div>',
    '<div>',
    '<% if (error.request_info) { %>',
    'Request Info: <pre><code><%- error.request_info %></code></pre>',
    '<% } %>',
    '</div>',
    '<div>',
    '<% if (error.response_data) { %>',
    'Response Data: <pre><code><%- error.response_data %></code></pre>',
    '<% } %>',
    '</div>',
    '<div>',
    '<% if (error.stack) { %>',
    'Stack: <pre><%- error.stack %></pre>',
    '<% } %>',
    '</div>',
    '</div>',
    '</div>'
].join(' ');