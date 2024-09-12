import {use} from 'chai';
import sinonChai from 'sinon-chai';
import Entity from "../src";

use(sinonChai);

describe.skip('Performance', function() {
	const rawEntity = {
		links: [
			{
				rel: ['self'],
				href: 'http://example.com/api/1'
			}
		],
		entities: [{
			rel: ['item'],
			links: [
				{
					rel: ['via'],
					href: 'http://example.com/api/1/1'
				}
			],
			properties: {
				prop1: 'foo',
				prop2: 'bar',
			}
		}, {
			rel: ['item'],
			links: [
				{
					rel: ['self'],
					href: 'http://example.com/api/1/3'
				}
			],
			properties: {
				prop1: 'foo',
				prop2: 'bar',
			},
			entities: [{
				rel: ['sub-entity'],
				links: [
					{
						rel: ['self'],
						href: 'http://example.com/api/1/3/1'
					}
				],
				properties: {
					prop1: 'foo',
					prop2: 'bar',
				},
				actions: [{
					name: 'action1',
					href: 'http://example.com/api/1/3/1/action1',
					fields: [{
						name: 'field1',
						type: 'text',
						required: true,
					},{
						name: 'field2',
						type: 'text',
						required: true,
					},{
						name: 'field3',
						type: 'number',
						required: true,
					},{
						name: 'field4',
						type: 'text',
						required: true,
					}],
					method: 'POST',
				}]
			}]
		}]
	};

	describe('parse performance test', function() {
		this.timeout(100_000);
		const iterations = 5000000;
		it('should parse in a reasonable amount of time', () => {
			console.time('test');
			for (let i = 0; i < iterations; i++) {
				Entity(rawEntity);
			}
			console.timeEnd('test');
		});
	});

});
