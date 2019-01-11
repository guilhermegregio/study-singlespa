variable "app_name" {
  default = "study-singlespa"
}

variable "profile" {
  default = "default"
}

provider "aws" {
  region = "us-east-1"
  profile = "${var.profile}"
}

output "root_bucket_name" {
  value = "${aws_s3_bucket.root.id}"
}

output "nav_bucket_name" {
  value = "${aws_s3_bucket.nav.id}"
}

output "calendar_bucket_name" {
  value = "${aws_s3_bucket.calendar.id}"
}

output "checkout_bucket_name" {
  value = "${aws_s3_bucket.checkout.id}"
}

output "dashboard_bucket_name" {
  value = "${aws_s3_bucket.dashboard.id}"
}

output "cloudfront_id" {
  value = "${aws_cloudfront_distribution.main.id}"
}

output "cloudfront_domain" {
  value = "${aws_cloudfront_distribution.main.domain_name}"
}
