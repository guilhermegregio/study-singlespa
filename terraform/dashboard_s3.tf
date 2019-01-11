data "aws_iam_policy_document" "dashboard" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject"
    ]
    resources = [
    "${aws_s3_bucket.dashboard.arn}",
    "${aws_s3_bucket.dashboard.arn}/*"
    ]
    principals {
      type = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.main.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket" "dashboard" {
  bucket_prefix = "${var.app_name}"
  acl = "private"
  force_destroy = true
  acceleration_status = "Enabled"
}

resource "aws_s3_bucket_policy" "dashboard" {
  bucket = "${aws_s3_bucket.dashboard.id}"
  policy = "${data.aws_iam_policy_document.dashboard.json}"
}
