const path = require('path');

exports.handler = (evt, ctx, cb) => {
  const {request} = evt.Records[0].cf;
  const calendar_bucket_name = 'study-singlespa20190111195059208900000001.s3.amazonaws.com';
  const checkout_bucket_name = 'study-singlespa20190111195059209200000002.s3.amazonaws.com';
  const dashboard_bucket_name = 'study-singlespa20190111195059210800000003.s3.amazonaws.com';
  const nav_bucket_name = 'study-singlespa20190111193311289500000001.s3.amazonaws.com';

  let newRequest = request;

  if (!path.extname(request.uri)) {
    request.uri = '/index.html';
  }

  redirect('/calendar', calendar_bucket_name, newRequest);
  redirect('/checkout', checkout_bucket_name, newRequest);
  redirect('/dashboard', dashboard_bucket_name, newRequest);
  redirect('/nav', nav_bucket_name, newRequest);

  cb(null, newRequest);
}

function redirect(pathname, bucket, request) {
  const regex = new RegExp('^' + pathname);

  if (!regex.test(request.uri)) {
    return request;
  }

  request.uri = request.uri.replace(pathname, '');

  request.origin.s3.domainName = bucket;
  request.headers['host'] = [{key: 'host', value: bucket}];

  return request;
}
