data "aws_iam_policy_document" "checkout" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject"
    ]
    resources = [
    "${aws_s3_bucket.checkout.arn}",
    "${aws_s3_bucket.checkout.arn}/*"
    ]
    principals {
      type = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.main.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket" "checkout" {
  bucket_prefix = "${var.app_name}"
  acl = "private"
  force_destroy = true
  acceleration_status = "Enabled"
}

resource "aws_s3_bucket_policy" "checkout" {
  bucket = "${aws_s3_bucket.checkout.id}"
  policy = "${data.aws_iam_policy_document.checkout.json}"
}
