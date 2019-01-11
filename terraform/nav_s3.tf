data "aws_iam_policy_document" "nav" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject"
    ]
    resources = [
    "${aws_s3_bucket.nav.arn}",
    "${aws_s3_bucket.nav.arn}/*"
    ]
    principals {
      type = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.main.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket" "nav" {
  bucket_prefix = "${var.app_name}"
  acl = "private"
  force_destroy = true
  acceleration_status = "Enabled"
}

resource "aws_s3_bucket_policy" "nav" {
  bucket = "${aws_s3_bucket.nav.id}"
  policy = "${data.aws_iam_policy_document.nav.json}"
}
