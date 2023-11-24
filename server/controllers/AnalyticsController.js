/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
// propertyId = 'YOUR-GA4-PROPERTY-ID';

// Imports the Google Analytics Data API client library.
import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

export async function runReport(req, res) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/416413446`,
      dateRanges: [
        {
          startDate: '2020-03-31',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });
    const data = response.rows
      .filter(item => item.dimensionValues.length === 1 
        && !item.dimensionValues[0].value.includes('video')
        && !item.dimensionValues[0].value.includes('undefined')
        && !item.dimensionValues[0].value.includes('logout')
        && !item.dimensionValues[0].value.includes('admin'))
      .map(item => ({
        path: item.dimensionValues[0].value,
        accessValue: item.metricValues[0].value 
      }));
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error', err: error });
  }
}