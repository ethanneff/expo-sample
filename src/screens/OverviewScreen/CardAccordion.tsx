import { Accordion, AccordionItem } from '~/components/Accordion/Accordion';
import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';

export const CardAccordion = () => {
  return (
    <Card>
      <Accordion>
        <AccordionItem title="Product Information" value="1" withDivider>
          <Text
            title="Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability."
          />
          <Text
            title="Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts."
          />
        </AccordionItem>
        <AccordionItem title="Shipping Details" value="2" withDivider>
          <Text
            title="We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days."
          />
          <Text
            title="All orders are carefully packaged and fully insured. Track your
            shipment in real-time through our dedicated tracking portal."
          />
        </AccordionItem>
        <AccordionItem title="Return Policy" value="3" withDivider={false}>
          <Text
            title="We stand behind our products with a comprehensive 30-day return
            policy. If you're not completely satisfied, simply return the
            item in its original condition."
          />
          <Text
            title="Our hassle-free return process includes free return shipping and
            full refunds processed within 48 hours of receiving the returned
            item."
          />
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
