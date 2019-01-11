data "aws_iam_policy_document" "root" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject"
    ]
    resources = [
    "${aws_s3_bucket.root.arn}",
    "${aws_s3_bucket.root.arn}/*"
    ]
    principals {
      type = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.main.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket" "root" {
  bucket_prefix = "${var.app_name}"
  acl = "private"
  force_destroy = true
  acceleration_status = "Enabled"
}

resource "aws_s3_bucket_policy" "root" {
  bucket = "${aws_s3_bucket.root.id}"
  policy = "${data.aws_iam_policy_document.root.json}"
}
