import React from "react";

export default function page() {
  return (
    <div className="max-w-sectionLayout mx-auto my-10">
      <h2 className=" border-b-2 pb-3 text-2xl font-semibold mb-8">
        Payment Refund Policy
      </h2>
      <article className="prose lg:prose-xl">
        <p>
          We at Kubernetes Community Day Dhaka strive to provide an exceptional
          experience for all attendees. However, we understand that
          circumstances may arise which require refunds for ticket purchases.
          Please review the following policy regarding refunds:
        </p>
        <div className="">
          <h4>Refund Eligibility:</h4>
          <ul>
            <li>
              Refunds will only be issued for tickets purchased through our
              official website.
            </li>
            <li>
              Requests for refunds must be made within 15 days before the event
              date.
            </li>
          </ul>
        </div>
        <div>
          <h4>Refund Process:</h4>
          <ul>
            <li>
              All refund requests must be submitted in writing via email to{" "}
              <a href="mailto:organizers@kcddhaka.org">
                organizers@kcddhaka.org
              </a>
              .
            </li>
            <li>
              Please include your full name, email address used for the
              purchase, and order number in your refund request.
            </li>
            <li>
              Refunds will be processed within 5-7 business days after the
              approval of the request.
            </li>
          </ul>
        </div>
        <div>
          <h4>Refund Criteria:</h4>
          <ul>
            <li>
              Refunds will be granted under the following circumstances:
              <ul>
                <li>
                  The event is cancelled by Kubernetes Community Day Dhaka
                  organisers.
                </li>
                <li>In the case of duplicate purchases made in error.</li>
              </ul>
            </li>
            <li>
              Refunds will not be granted for the following reasons:
              <ul>
                <li>Change in personal circumstances preventing attendance.</li>
                <li>Failure to attend the event without prior notification.</li>
                <li>Dissatisfaction with the event content or experience.</li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <h4>Cancellation Policy:</h4>
          <ul>
            <li>
              Kubernetes Community Day Dhaka reserves the right to cancel or
              reschedule the event at any time. In such cases, registered
              attendees will be notified via email, and refunds will be
              processed accordingly.
            </li>
            <li>
              We are not responsible for any additional expenses incurred by
              attendees in the event of cancellation or rescheduling, including
              but not limited to travel and accommodation costs.
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact Information:</h4>
          <ul>
            <li>
              For all refund-related inquiries or to submit a refund request,
              please contact us via email at{" "}
              <a href="mailto:organizers@kcddhaka.org">
                organizers@kcddhaka.org
              </a>{" "}
              .
            </li>
          </ul>
        </div>
        <p>
          By purchasing tickets for Kubernetes Community Day Dhaka, you
          acknowledge that you have read, understood, and agreed to our payment
          refund policy outlined above.
        </p>
      </article>
    </div>
  );
}
